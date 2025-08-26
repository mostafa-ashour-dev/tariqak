import { Router } from "express";
const router = Router();

// Routes Imports
import authRoutes from "./routes/auth/auth.routes";

// Auth Routes
router.use("/auth", authRoutes);

export default router;
