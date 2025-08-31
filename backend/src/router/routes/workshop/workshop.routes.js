import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../../middlewares/auth-user.middleware";
import {
    createWorkshop,
    getWorkshop,
} from "../../../controllers/workshop/workshop.controller";

const router = Router();

// Create Workshop
/* /api/v1/workshop - POST */
router.post("/", authUser("admin"), expressAsyncHandler(createWorkshop));

// Get Workshop
/* /api/v1/workshop/:workshopSlug - GET */
router.get("/:workshopSlug", expressAsyncHandler(getWorkshop));

export default router;
