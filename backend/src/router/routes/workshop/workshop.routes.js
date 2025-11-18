import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../../middlewares/auth-user.middleware";
import {
    addWorkshopLocation,
    createWorkshop,
    deleteWorkshop,
    editWorkshop,
    getWorkshop,
    getWorkshops,
} from "../../../controllers/workshop/workshop.controller";

const router = Router();

// Create Workshop
/* /api/v1/workshop - POST */
router.post("/", authUser("admin"), expressAsyncHandler(createWorkshop));

// Get Workshop
/* /api/v1/workshop/:title_slug - GET */
router.get("/:title_slug", expressAsyncHandler(getWorkshop));

// Get Workshops
/* /api/v1/workshop - GET */
router.get("/", expressAsyncHandler(getWorkshops));

// Edit Workshop
/* /api/v1/workshop/:title_slug - PUT */
router.put(
    "/:title_slug",
    authUser("admin"),
    expressAsyncHandler(editWorkshop)
);

// Add Workshop Location
/* /api/v1/workshop/:title_slug - POST */
router.post(
    "/:title_slug/location",
    authUser("admin"),
    expressAsyncHandler(addWorkshopLocation)
);

// Delete workshop
/* /api/v1/workshop/:title_slug - DELETE */
router.delete(
    "/:title_slug",
    authUser("admin"),
    expressAsyncHandler(deleteWorkshop)
);

export default router;
