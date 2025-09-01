import mongoose from "mongoose";
import slugify from "slugify";
import crypto from "crypto";

const workShopSchema = mongoose.Schema(
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

workShopSchema.index({ "locations.location": "2dsphere" });
workShopSchema.index({ title: "text", description: "text" });
workShopSchema.index({ title_slug: 1 }, { unique: true });

workShopSchema.methods.updateTitleSlug = async function (newTitle) {
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

const WorkShop = mongoose.model("WorkShop", workShopSchema);
export default WorkShop;
