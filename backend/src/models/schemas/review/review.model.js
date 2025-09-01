import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reference: {
            type: {
                type: String,
                required: [true, "Review reference type is required"],
                trim: true,
                enum: ["driver", "workshop"],
            },
            target: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, "Review reference target is required"],
                trim: true,
            }
        },
        rating: {
            type: Number,
            required: [true, "Review rating is required"],
            min: 1,
            max: 5,
            trim: true,
        },
        comment: {
            type: String,
            trim: true,
            default: "",
        },
        image: {
            type: String,
            trim: true,
            default: "",
        },
        is_anonymous: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
