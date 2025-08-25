import mongoose from "mongoose";

const workShopSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: [true, "WorkShop title is required"],
            trim: true,
            minLength: 3,
            maxLength: 255,
        },
        title_slug: {
            type: String,
            required: [true, "WorkShop title_slug is required"],
            trim: true,
            minLength: 3,
            maxLength: 255,
        },
        description: {
            type: String,
            required: [true, "WorkShop description is required"],
            trim: true,
            minLength: 3,
            maxLength: 2500,
        },
        images: {
            type: [String],
            default: [],
        },
        features: {
            type: [String],
            default: [],
        },
        rating: {
            type: Number,
            default: 0,
        },
        logo: {
            type: String,
            default: "",
        },
        locations: [
            {
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point",
                },
                coordinates: {
                    type: [Number],
                    required: true,
                },
                address: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

workShopSchema.index({ "locations.coordinates": "2dsphere" });
workShopSchema.index({ title: "text", description: "text" });
workShopSchema.index({ title_slug: 1 }, { unique: true });

const WorkShop = mongoose.model("WorkShop", workShopSchema);
export default WorkShop;
