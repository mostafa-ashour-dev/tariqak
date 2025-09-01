import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
    login,
    logout,
    refresh,
    register,
    requestPasswordResetCode,
    requestVerificationCode,
    verifyCode,
    resetPassword,
} from "../../../controllers/auth/auth.controller";
import { authUser } from "../../../middlewares/auth-user.middleware";

const router = Router();

// Regitster
/* /api/v1/auth/register - POST */
/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     description: Register a new user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *
*/
router.post("/register", expressAsyncHandler(register));

// Login
/* /api/v1/auth/login - POST */
router.post("/login", expressAsyncHandler(login));

// Logout
/* /api/v1/auth/logout - POST */
router.post("/logout", authUser(), expressAsyncHandler(logout));

// Refresh
/* /api/v1/auth/refresh - GET */
router.get(
    "/refresh",
    authUser("all", "refresh"),
    expressAsyncHandler(refresh)
);

// Verify
/* /api/v1/auth/verify - POST */
router.post("/verify/:type", expressAsyncHandler(verifyCode));

// Send Verification Code
/* /api/v1/auth/Send Verification Code - POST */
router.post(
    "/request-verification-code",
    expressAsyncHandler(requestVerificationCode)
);

// Send Verification Code
/* /api/v1/auth/request-password-code - POST */
router.post(
    "/request-password-code",
    expressAsyncHandler(requestPasswordResetCode)
);

// Reset Password
/* /api/v1/auth/reset-password - POST */
router.post("/reset-password", expressAsyncHandler(resetPassword));

export default router;
