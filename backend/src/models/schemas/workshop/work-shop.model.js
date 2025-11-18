import mongoose from "mongoose";
import slugify from "slugify";
import Review from "../review/review.model";
import { locationSchema } from "../roles/driver.model";

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

workshopSchema.methods.updateTitleSlug = async function (newTitle) {

    const slugifiedTitle = slugify(newTitle, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });

    const sufixedSlug = slugifiedTitle + "-" + this._id;
    this.title_slug = sufixedSlug;

    await this.save();

    return sufixedSlug;
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
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;

    this.rating = rating;
    await this.save();
};

const WorkShop = mongoose.model("WorkShop", workshopSchema);
export default WorkShop;
