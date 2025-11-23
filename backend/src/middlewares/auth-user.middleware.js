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
            if (!authorizationHeader?.startsWith("Bearer ")) {
                throw new ResponseError(403, "Auth Error", "Unauthorized - Missing or invalid token");
            }

            const token = authorizationHeader.split(" ")[1];

            try {
                const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
                const decoded = jwt.verify(token, secret);

                const user = await User.findById(decoded._id).lean();

                if (!user) {
                    throw new ResponseError(400, "Input Error", "User not found");
                }

                if (role !== "all" && user.role !== role) {
                    throw new ResponseError(403, "Auth Error", `Unauthorized - Only ${role} allowed`);
                }

                delete user.password;
                req.user = user;

            } catch (error) {
                if (error.name === "TokenExpiredError") {
                    throw new ResponseError(401, "Auth Error", "Token expired");
                }

                throw new ResponseError(403, "Auth Error", error.message || "Invalid token");
            }

            next();
        };


export { authUser };
