import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
    login,
    logout,
    refresh,
    register,
    sendCode,
    verify,
} from "../../../controllers/auth/auth.controller";
import { authUser } from "../../../middlewares/auth-user.middleware";

const router = Router();

// Regitster
/* /api/v1/auth/register - POST */
router.post("/register", expressAsyncHandler(register));

// Login
/* /api/v1/auth/login - POST */
router.post("/login", expressAsyncHandler(login));

// Logout
/* /api/v1/auth/logout - POST */
router.post("/logout", authUser(), expressAsyncHandler(logout));

// Refresh
/* /api/v1/auth/refresh - GET */
router.get("/refresh", authUser("refresh"), expressAsyncHandler(refresh));

// Verify
/* /api/v1/auth/verify - POST */
router.post("/verify", expressAsyncHandler(verify));

// Send Verification Code
/* /api/v1/auth/Send Verification Code - POST */
router.post("/send-code", expressAsyncHandler(sendCode));

// Reset Password
/* /api/v1/auth/reset-password - POST */
router.post("/reset-password", expressAsyncHandler());

export default router;
