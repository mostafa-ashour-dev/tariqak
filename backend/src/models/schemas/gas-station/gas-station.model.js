import mongoose from "mongoose";
import slugify from "slugify";
import crypto from "crypto";
import Review from "../review/review.model";

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
            address: {
                type: String,
                trim: true,
            },
            location: {
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point",
                },
                coordinates: {
                    type: [Number],
                    required: true,
                },
            },
        },
    ],
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
        }
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

gasStationSchema.methods.updateTitleSlug = async function (newTitle) {
    const slugifiedTitle = slugify(this.title, {
        lower: true,
        strict: true,
        remove: /[*+~()'"!:@]/g,
    });

    if (newTitle && this.title === newTitle) return;

    const sufixedSlug =
        slugifiedTitle + "-" + crypto.randomBytes(4).toString("hex");
    this.title_slug = sufixedSlug;

    await this.save();
};

gasStationSchema.methods.updateRating = async function () {
    const reviews = await Review.find({
        "reference.type": "gas-station",
        "reference.target": this._id,
    });

    if (!reviews.length) {
        this.rating = 0;
        await this.save();
        return;
    }

    const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;

    this.rating = rating;
    await this.save();
};

const GasStation = mongoose.model("GasStation", gasStationSchema);
export default GasStation;
