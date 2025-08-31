import { Router } from "express";
const router = Router();
import expressAsyncHandler from "express-async-handler";
import { driverOnboarding } from "../../../controllers/onboarding/onboarding.controller";
import { authUser } from "../../../middlewares/auth-user.middleware";

// Driver Onboarding
/* /api/v1/onboarding/driver - POST */
router.post(
    "/driver",
    authUser("driver", "access"),
    expressAsyncHandler(driverOnboarding)
);

export default router;
