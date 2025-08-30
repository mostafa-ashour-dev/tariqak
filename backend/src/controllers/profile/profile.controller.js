import ResponseError from "../../classes/response-error.class";
import User from "../../models/schemas/auth/user.model";
import Driver from "../../models/schemas/auth/driver.model";

const getUserProfileAuth = async (req, res) => {
    const { user } = req;

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    const objUser = findUser.toJSON();
    delete objUser.password;
    delete objUser.verification_code;
    delete objUser.reset_password_code;
    delete objUser.reset_password_expiration;
    delete objUser.verification_code_expiration;
    if (findUser.role === "driver") {
        const findDriver = await Driver.findOne({ user: findUser._id });
        if (!findDriver) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }

        const objDriver = findDriver.toJSON();
        delete objDriver.user;
        delete objDriver.license_image;
        delete objDriver._id;

        objUser.role_data = objDriver;
    } else {
        objUser.role_data = null;
    }

    const data = {
        user: objUser,
    };
    res.status(200).json({
        success: true,
        type: "success",
        message: "User profile found successfully",
        data,
    });
};

const getUserProfilePublic = async (req, res) => {
    const { user } = req;
    const { username } = req.params;

    if (!username) {
        throw new ResponseError(400, "Input Error", "Username is required");
    }

    const existingUser = await User.findById(user._id);

    if (!existingUser) {
        throw new ResponseError(
            400,
            "Input Error",
            "User requesting the profile not found"
        );
    }

    const findUser = await User.findOne({ username });
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    if (findUser.role === "user" && existingUser.role !== "admin") {
        throw new ResponseError(
            400,
            "Input Error",
            "Unauthorized access - You can only view your own profile or drivers"
        );
    }

    const objUser = findUser.toJSON();
    delete objUser.password;
    delete objUser.verification_code;
    delete objUser.reset_password_code;
    delete objUser.reset_password_expiration;
    delete objUser.verification_code_expiration;

    if (findUser.role === "driver") {
        const findDriver = await Driver.findOne({ user: findUser._id });
        if (!findDriver) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }

        const objDriver = findDriver.toJSON();
        delete objDriver.user;
        delete objDriver.license_image;
        delete objDriver._id;

        objUser.role_data = objDriver;
    } else {
        objUser.role_data = null;
    }

    const data = {
        user: objUser,
    };

    res.status(200).json({
        success: true,
        type: "success",
        message: "User profile found successfully",
        data: data,
    });
};

export { getUserProfileAuth, getUserProfilePublic };
