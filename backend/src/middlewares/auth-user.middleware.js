import ResponseError from "../classes/response-error.class";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} from "../config/env.config";
import jwt from "jsonwebtoken";
import User from "../models/schemas/auth/user.model";

const authUser =
    (role = "all", type = "access") =>
        async (req, res, next) => {
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

                if (role && role !== "all" && decodedUser.role !== role) {
                    throw new ResponseError(
                        403,
                        "Auth Error",
                        `Unauthorized - User is not ${role}`
                    );
                }

                const findUser = await User.findOne({ _id: decodedUser._id });

                if (!findUser) {
                    throw new ResponseError(400, "Input Error", "User not found");
                }

                if (findUser.role !== role) {
                    throw new ResponseError(
                        403,
                        "Auth Error",
                        `Unauthorized - User is not ${role}`
                    );
                }

                req.user = findUser;

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
