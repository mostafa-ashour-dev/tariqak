import { Router } from "express";
const router = Router();

// Routes Imports
import authRoutes from "./routes/auth/auth.routes";
import onboardingRoutes from "./routes/onboarding/onboarding.routes";
import profileRoutes from "./routes/profile/profile.routes";
import workshopRoutes from "./routes/workshop/workshop.routes";
import reviewRoutes from "./routes/review/review.routes";

// Auth Routes
router.use("/auth", authRoutes);

// Onboarding Routes
router.use("/onboarding", onboardingRoutes);

// Profile Routes
router.use("/profile", profileRoutes);

// Workshop Routes
router.use("/workshop", workshopRoutes);

// Review Routes
router.use("/review", reviewRoutes);

export default router;
