import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { uploadImage } from "../../../controllers/upload/upload.controller";
import { upload } from "../../../config/multer.config";
import { authUser } from "../../../middlewares/auth-user.middleware";

const router = Router();

// Upload Image
/* /api/v1/upload - POST */
router.post(
    "/",
    authUser(),
    upload.single("image"),
    expressAsyncHandler(uploadImage)
);

// Upload Image With Reference
/* /api/v1/upload/:referenceSlug - POST */
router.post(
    "/:referenceSlug",
    authUser(),
    upload.single("image"),
    expressAsyncHandler(uploadImage)
);

export default router;
