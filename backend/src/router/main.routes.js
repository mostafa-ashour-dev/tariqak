import { Router } from "express";
const router = Router();

// Routes Imports
import authRoutes from "./routes/auth/auth.routes";
import onboardingRoutes from "./routes/onboarding/onboarding.routes";

// Auth Routes
router.use("/auth", authRoutes);

// Onboarding Routes
router.use("/onboarding", onboardingRoutes);

export default router;
