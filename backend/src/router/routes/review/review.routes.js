import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../../middlewares/auth-user.middleware";
import { createReview, getTargetReviews } from "../../../controllers/review/review.controller";

const router = Router();

// Create Review
/* /api/v1/review - POST */
router.post("/:referenceType/:target", authUser(), expressAsyncHandler(createReview));

// Get Target Reviews
/* /api/v1/review/:referenceType/:target - GET */
router.get("/:referenceType/:target", expressAsyncHandler(getTargetReviews));

export default router;