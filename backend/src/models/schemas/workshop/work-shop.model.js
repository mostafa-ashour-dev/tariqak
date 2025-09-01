import mongoose from "mongoose";
import slugify from "slugify";
import crypto from "crypto";
import Review from "../review/review.model";

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
            type: [String],
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
            type: String,
            default: "",
        },
        locations: [
            {
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
                address: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

workshopSchema.index({ "locations.location": "2dsphere" });
workshopSchema.index({ title: "text", description: "text" });
workshopSchema.index({ title_slug: 1 }, { unique: true });

workshopSchema.methods.updateTitleSlug = async function (newTitle) {
    const slugifiedTitle = slugify(this.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });

    if (this.title === newTitle) return;

    const sufixedSlug =
        slugifiedTitle + "-" + crypto.randomBytes(4).toString("hex");
    this.title_slug = sufixedSlug;

    await this.save();
};

workshopSchema.methods.updateRating = async function () {
    const reviews = await Review.find({
        "reference.type": "workshop",
        "reference.target": this._id,
    });

    if (!reviews.length) {
        this.rating = 0;
        await this.save();
        return;
    }

    const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    this.rating = rating;
    await this.save();
};

const WorkShop = mongoose.model("WorkShop", workshopSchema);
export default WorkShop;
