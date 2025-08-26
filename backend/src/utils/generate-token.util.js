import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} from "../config/env.config";

const generateToken = ({ user, type }) => {
    const payload = {
        _id: user._id,
    };

    if (type === "access") {
        payload.role = user.role;
    }

    const token = jwt.sign(
        payload,
        type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
        {
            expiresIn: type === "access" ? "15m" : "7d",
        }
    );
    return token;
};

export { generateToken };
