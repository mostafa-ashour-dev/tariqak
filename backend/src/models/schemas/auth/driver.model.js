import mongoose from "mongoose";

const driverSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        license_image: {
            type: String,
            required: [true, "Driver license image is required"],
            trim: true,
        },
        car_plate: {
            type: String,
            required: [true, "Driver car_plate is required"],
            trim: true,
            unique: true,
            match: /^[\u0621-\u064A A-Z]{2,3}-[0-9]{3,4}$/u,
        },
        car_image: {
            type: String,
            default: "",
            trim: true,
        },
        areas: [
            {
                name: {
                    type: String,
                    trim: true,
                    required: [true, "Driver area name is required"],
                },
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point",
                },
                coordinates: {
                    type: [Number],
                    required: true,
                    validate: {
                        validator: function (value) {
                            return value.length === 2;
                        },
                        message:
                            "Area coordinates must be an array of two numbers [longitude, latitude]",
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
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

driverSchema.index({ "areas.coordinates": "2dsphere" });

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
