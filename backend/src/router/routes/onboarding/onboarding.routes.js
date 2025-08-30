import { Router } from "express";
const router = Router();
import expressAsyncHandler from "express-async-handler";
import { driverOnboarding } from "../../../controllers/onboarding/onboarding.controller";
import { authUser } from "../../../middlewares/auth-user.middleware";

// Driver Onboarding
/* /api/v1/onboarding/driver - POST */
router.post("/driver", authUser("access", "driver"), expressAsyncHandler(driverOnboarding));

export default router;
