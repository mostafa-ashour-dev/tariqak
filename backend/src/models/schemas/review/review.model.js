import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        reference: {
            type: String,
            enum: ["driver", "workshop"],
            required: [true, "Review reference is required"],
            trim: true,
        },
        reference_id: {
            type: String,
            required: [true, "Review reference_id is required"],
            trim: true,
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
