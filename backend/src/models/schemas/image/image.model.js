import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        url: {
            type: String,
            required: [true, "Image url is required"],
            trim: true,
        },
        public_id: {
            type: String,
            required: [true, "Image public_id is required"],
            trim: true,
        },
        file_name: {
            type: String,
            trim: true,
            default: "",
        },
        type: {
            type: String,
            required: [true, "Image type is required"],
            trim: true,
            enum: [
                "user-avatar",
                "license-image",
                "car-image",
                "workshop-logo",
                "gas-station-logo",
                "workshop-image",
                "gas-station-image",
            ],
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
