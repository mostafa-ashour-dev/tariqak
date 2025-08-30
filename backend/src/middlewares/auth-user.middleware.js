import ResponseError from "../classes/response-error.class";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} from "../config/env.config";
import jwt from "jsonwebtoken";

const authUser =
    (role, type = "access") =>
    (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new ResponseError(
                403,
                "Auth Error",
                "Unauthorized - No token"
            );
        }

        if (!authorizationHeader.startsWith("Bearer ")) {
            throw new ResponseError(
                403,
                "Auth Error",
                "Invalid authorization format"
            );
        }

        const token = authorizationHeader.split(" ")[1];

        try {
            const secret =
                type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
            const decodedUser = jwt.verify(token, secret);

            if (!decodedUser) {
                throw new ResponseError(
                    403,
                    "Auth Error",
                    "Unauthorized - Invalid token"
                );
            }

            delete decodedUser.iat;
            delete decodedUser.exp;
            req.user = decodedUser;

            if (role && decodedUser.role !== role) {
                throw new ResponseError(
                    403,
                    "Auth Error",
                    `Unauthorized - User is not an ${role}`
                );
            }
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new ResponseError(
                    401,
                    "Auth Error",
                    "Unauthorized - Token expired"
                );
            }

            if (error.name === "JsonWebTokenError") {
                throw new ResponseError(
                    403,
                    "Auth Error",
                    error.message || "Unauthorized - Invalid token"
                );
            }

            throw new ResponseError(
                403,
                "Auth Error",
                error.message || "Unable to verify token"
            );
        }

        next();
    };

export { authUser };
