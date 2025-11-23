import mongoose from "mongoose";
import { locationSchema } from "../roles/driver.model";
import { updateSlug } from "../../../helpers/update-slug.helper";
import { updateRating } from "../../../helpers/update-rating.helper";

const gasStationSchema = mongoose.Schema({
    reference: {
        type: {
            type: String,
            required: [true, "GasStation reference type is required"],
            trim: true,
            enum: ["admin", "cache"],
        },
        target: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            trim: true,
            default: null,
        },
    },
    title: {
        type: String,
        required: [true, "GasStation title is required"],
        trim: true,
        minLength: 3,
        maxLength: 255,
    },
    title_slug: {
        type: String,
        trim: true,
        default: "",
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    images: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Image",
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    locations: {
        type: [locationSchema],
        default: [],
    },
    services: [
        {
            title: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
        },
    ],
    is_active: {
        type: Boolean,
        default: true,
    },
    external_id: {
        type: String,
        trim: true,
    },
});

gasStationSchema.index({ "locations.location": "2dsphere" });
gasStationSchema.index({ title: "text", description: "text" });
gasStationSchema.index({ "locations.address": "text" });
gasStationSchema.index({ "services.title": "text" });
gasStationSchema.index({ title_slug: 1 }, { unique: true });

gasStationSchema.methods.updateTitleSlug = updateSlug;

gasStationSchema.methods.updateRating = updateRating("gas-station");

const GasStation = mongoose.model("GasStation", gasStationSchema);
export default GasStation;
