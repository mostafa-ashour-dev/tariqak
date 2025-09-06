import mongoose from "mongoose";
import Review from "../review/review.model";

const driverSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        license_image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            required: [true, "Driver license image is required"],
            trim: true,
        },
        car_plate: {
            numbers: {
                type: String,
                required: [true, "Driver car plate numbers is required"],
                trim: true,
            },
            letters: {
                type: String,
                required: [true, "Driver car plate letters is required"],
                trim: true,
            },
        },
        car_image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            default: null,
            trim: true,
        },
        areas: [
            {
                name: String,
                location: {
                    type: {
                        type: String,
                        enum: ["Point"],
                        required: true,
                    },
                    coordinates: {
                        type: [Number],
                        required: true,
                    },
                },
            },
        ],
        car_model: {
            type: String,
            trim: true,
        },
        car_color: {
            type: String,
            trim: true,
        },
        active_period: {
            start: {
                type: String,
                trim: true,
                match: /^([0-1]\d|2[0-3]):([0-5]\d)$/,
                required: [true, "Driver active period start is required"],
            },
            end: {
                type: String,
                trim: true,
                match: /^([0-1]\d|2[0-3]):([0-5]\d)$/,
                required: [true, "Driver active period end is required"],
            },
        },
        active_all_day: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

driverSchema.index({ "areas.location": "2dsphere" });

driverSchema.methods.updateRating = async function () {
    const reviews = await Review.find({
        "reference.type": "driver",
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

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
