import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../../middlewares/auth-user.middleware";
import {
    getUserProfileAuth,
    getUserProfilePublic,
} from "../../../controllers/profile/profile.controller";

const router = Router();

// Get User Profile Auth
/* /api/v1/profile/auth - GET */
router.get("/auth", authUser(), expressAsyncHandler(getUserProfileAuth));

// Get User Profile Public
/* /api/v1/profile/public/:username - GET */
router.get(
    "/public/:username",
    authUser(),
    expressAsyncHandler(getUserProfilePublic)
);

export default router;
