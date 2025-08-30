import { Router } from "express";
const router = Router();

// Routes Imports
import authRoutes from "./routes/auth/auth.routes";
import onboardingRoutes from "./routes/onboarding/onboarding.routes";
import profileRoutes from "./routes/profile/profile.routes";

// Auth Routes
router.use("/auth", authRoutes);

// Onboarding Routes
router.use("/onboarding", onboardingRoutes);

// Profile Routes
router.use("/profile", profileRoutes);

export default router;
