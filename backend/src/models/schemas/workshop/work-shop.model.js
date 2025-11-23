import mongoose from "mongoose";
import { locationSchema } from "../roles/driver.model";
import { updateSlug } from "../../../helpers/update-slug.helper";
import { updateRating } from "../../../helpers/update-rating.helper";

const workshopSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
            trim: true,
        },
        description: {
            type: String,
            required: [true, "WorkShop description is required"],
            trim: true,
            minLength: 3,
            maxLength: 2500,
        },
        images: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Image",
            default: [],
        },
        services: {
            type: [
                {
                    title: {
                        type: String,
                        required: [true, "Service title is required"],
                        trim: true,
                        minLength: 3,
                        maxLength: 255,
                    },
                    description: {
                        type: String,
                        required: [true, "Service description is required"],
                        trim: true,
                        minLength: 3,
                        maxLength: 2500,
                    },
                },
            ],
            default: [],
        },
        rating: {
            type: Number,
            default: 0,
        },
        logo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            default: null,
        },
        locations: {
            type: [locationSchema],
            default: [],
        },
    },
    { timestamps: true }
);

workshopSchema.index({ "locations.location": "2dsphere" });
workshopSchema.index({ title: "text", description: "text" });
workshopSchema.index({ title_slug: 1 }, { unique: true });

workshopSchema.methods.updateTitleSlug = updateSlug;

workshopSchema.methods.updateRating = updateRating("workshop");

const WorkShop = mongoose.model("WorkShop", workshopSchema);
export default WorkShop;
