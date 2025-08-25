import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        passenger: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
        },
        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "in_progress",
                "completed",
                "cancelled",
            ],
            default: "pending",
        },
        start_location: {
            address: { type: String, trim: true },
            type: { type: String, enum: ["Point"], default: "Point" },
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
        end_location: {
            address: { type: String, trim: true },
            type: { type: String, enum: ["Point"], default: "Point" },
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
        payment_method: {
            type: String,
            enum: ["cash", "wallet", "credit_card"],
            default: "cash",
        },
        start_time: { type: Date },
        end_time: { type: Date },
        price: { type: Number },
        distance: { type: Number },
    },
    { timestamps: true }
);

tripSchema.index({ start_location: "2dsphere" });
tripSchema.index({ end_location: "2dsphere" });

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
