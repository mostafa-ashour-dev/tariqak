import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../../middlewares/auth-user.middleware";
import {
    editDriverProfile,
    editUserProfile,
    getNearbyDrivers,
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

// Edit User Profile
/* /api/v1/profile/personal-info - PUT */
router.put("/personal-info", authUser(), expressAsyncHandler(editUserProfile));

// Edit Driver Profile
/* /api/v1/profile/driver-info - PUT */
router.put(
    "/driver-info",
    authUser("driver"),
    expressAsyncHandler(editDriverProfile)
);

// Get Nearby Drivers
/* /api/v1/profile/drivers - GET */
router.get(
    "/drivers",
    expressAsyncHandler(getNearbyDrivers)
)
export default router;
