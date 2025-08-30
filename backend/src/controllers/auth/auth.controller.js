import { getIpData } from "../../utils/get-ip-data.util";
import returnMissingFields from "../../utils/missing-fields.util";
import User from "../../models/schemas/auth/user.model";
import bcrypt from "bcryptjs";
import ResponseError from "../../classes/response-error.class";
import slugify from "slugify";
import crypto from "crypto";
import { generateToken } from "../../utils/generate-token.util";
import Session from "../../models/schemas/auth/session.model";

const register = async (req, res) => {
    const { full_name, phone_number, email, password, role } = req.body || {};

    const missingFields = returnMissingFields({
        full_name,
        phone_number,
        email,
        password,
        role,
    });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ipData = await getIpData(ip);
    const username =
        slugify(full_name, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        }) +
        "-" +
        crypto.randomBytes(4).toString("hex");

    const existingUser = await User.findOne({
        $or: [{ email }, { phone_number }],
    });
    if (existingUser) {
        throw new ResponseError(400, "Input Error", "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        full_name,
        phone_number,
        username,
        email,
        password: hashedPassword,
        country: ipData.country,
        city: ipData.city,
        role,
        is_onboarded: role === "user" ? true : false,
    });

    res.status(201).json({
        success: true,
        type: "success",
        message: "User registered successfully",
    });
};

const requestVerificationCode = async (req, res) => {
    const { type, credential } = req.body || {};

    const missingFields = returnMissingFields({ type, credential });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    if (type !== "email" && type !== "phone_number") {
        throw new ResponseError(400, "Input Error", "Invalid type");
    }

    const user = await User.findOne({ [type]: credential });
    if (!user) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    if (user.is_verified) {
        throw new ResponseError(400, "Input Error", "User is already verified");
    }

    const code = await user.setRandomCode("verification_code");

    console.log(type, code);

    res.status(200).json({
        success: true,
        type: "success",
        message: "Verification code sent successfully",
    });
};

const verifyCode = async (req, res) => {
    const { code } = req.body || {};
    const { type } = req.params || "verification_code";
    const missingFields = returnMissingFields({ code });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const user = await User.findOne({
        $or: [{ verification_code: code }, { reset_password_code: code }],
    });
    if (!user) {
        throw new ResponseError(
            400,
            "Input Error",
            "Invalid verification code or user already verified"
        );
    }

    if (type === "password_reset") {
        if (user.reset_password_expiration < Date.now()) {
            throw new ResponseError(
                400,
                "Input Error",
                "Reset password code expired"
            );
        }
    } else {
        if (user.verification_code_expiration < Date.now()) {
            throw new ResponseError(
                400,
                "Input Error",
                "Verification code expired"
            );
        }

        user.verification_code = undefined;
        user.verification_code_expiration = undefined;
        user.is_verified = true;
    }

    await user.save();

    const message =
        type === "password_reset"
            ? "Password reset code verified successfully"
            : "User verified successfully";
    res.status(200).json({
        success: true,
        type: "success",
        message: message,
    });
};

const refresh = async (req, res) => {
    const { user } = req;
    const refreshTokenHeader = req.headers["authorization"]?.split(" ")[1];

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found or refresh token invalid");
    }

    const session = await Session.findOne({
        user: findUser._id,
        refresh_token: refreshTokenHeader,
    });

    if (!session) {
        throw new ResponseError(
            400,
            "Input Error",
            "Invalid refresh token or user already logged out"
        );
    }

    const accessToken = generateToken({ user, type: "access" });
    const refreshToken = generateToken({ user, type: "refresh" });

    session.refresh_token = refreshToken;
    session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await session.save();

    res.status(200).json({
        success: true,
        type: "success",
        message: "Token refreshed successfully",
        tokens: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
};

const login = async (req, res) => {
    const { credential, password } = req.body || {};

    const missingFields = returnMissingFields({ credential, password });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const user = await User.findOne({
        $or: [{ email: credential }, { phone_number: credential }],
    });

    if (!user) {
        throw new ResponseError(400, "Input Error", "Invalid credential");
    }

    if (!user.is_verified) {
        throw new ResponseError(400, "Input Error", "User is not verified");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(400, "Input Error", "Invalid password");
    }

    const accessToken = generateToken({ user, type: "access" });
    const refreshToken = generateToken({ user, type: "refresh" });
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    if (ip === "::1" || ip === "127.0.0.1") {
        ip = "105.196.251.106";
    }
    const device = req.headers["user-agent"];

    let existingSession = await Session.findOne({
        user: user._id,
        device,
    });

    if (existingSession) {
        existingSession.refresh_token = refreshToken;
        existingSession.ip = ip;
        existingSession.device = device;
        existingSession.expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );
        await existingSession.save();
    } else {
        existingSession = await Session.create({
            user: user._id,
            refresh_token: refreshToken,
            ip,
            device,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
    }

    user.last_login = Date.now();
    await user.save();

    res.status(200).json({
        success: true,
        type: "success",
        message: "User logged in successfully",
        user,
        tokens: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
};

const logout = async (req, res) => {
    const { user } = req;

    const device = req.headers["user-agent"];

    const session = await Session.findOne({ user: user._id, device });

    if (!session) {
        throw new ResponseError(400, "Input Error", "User is not logged in");
    }

    await Session.findByIdAndDelete(session._id);

    res.status(200).json({
        success: true,
        type: "success",
        message: "User logged out successfully",
    });
};

const requestPasswordResetCode = async (req, res) => {
    const { type, credential } = req.body || {};

    const missingFields = returnMissingFields({ type, credential });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const user = await User.findOne({
        $or: [{ email: credential }, { phone_number: credential }],
    });

    if (!user) {
        throw new ResponseError(400, "Input Error", "Invalid credential");
    }

    const code = await user.setRandomCode("password_reset");

    console.log(type, code);
    res.status(200).json({
        success: true,
        type: "success",
        message: "Password reset code sent successfully",
    });
};

const resetPassword = async (req, res) => {
    const { credential, code, new_password } = req.body || {};

    const missingFields = returnMissingFields({
        credential,
        code,
        new_password,
    });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const user = await User.findOne({
        $or: [{ email: credential }, { phone_number: credential }],
    });

    if (!user) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    if (user.reset_password_code !== code) {
        throw new ResponseError(400, "Input Error", "Invalid reset code");
    }

    if (user.reset_password_expiration < Date.now()) {
        throw new ResponseError(400, "Input Error", "Reset code expired");
    }

    user.password = await bcrypt.hash(new_password, 10);
    user.reset_password_code = undefined;
    user.reset_password_expiration = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        type: "success",
        message: "Password reset successfully",
    });
};

export {
    register,
    verifyCode,
    login,
    refresh,
    logout,
    requestVerificationCode,
    requestPasswordResetCode,
    resetPassword,
};
