import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../../middlewares/auth-user.middleware";
import {
    addWorkshopLocation,
    createWorkshop,
    editWorkshop,
    getWorkshop,
    getWorkshops,
} from "../../../controllers/workshop/workshop.controller";

const router = Router();

// Create Workshop
/* /api/v1/workshop - POST */
router.post("/", authUser("admin"), expressAsyncHandler(createWorkshop));

// Get Workshop
/* /api/v1/workshop/:workshopSlug - GET */
router.get("/:workshopSlug", expressAsyncHandler(getWorkshop));

// Get Workshops
/* /api/v1/workshop - GET */
router.get("/", expressAsyncHandler(getWorkshops));

// Edit Workshop
/* /api/v1/workshop/:workshopSlug - PUT */
router.put(
    "/:workshopSlug",
    authUser("admin"),
    expressAsyncHandler(editWorkshop)
);

// Add Workshop Location
/* /api/v1/workshop/:workshopSlug - POST */
router.post(
    "/:workshopSlug/location",
    authUser("admin"),
    expressAsyncHandler(addWorkshopLocation)
);

export default router;
