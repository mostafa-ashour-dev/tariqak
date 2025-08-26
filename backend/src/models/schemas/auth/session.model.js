import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        refresh_token: {
            type: String,
            required: [true, "Session token is required"],
            trim: true,
        },
        ip: {
            type: String,
            required: [true, "Session ip is required"],
            trim: true,
        },
        device: {
            type: String,
            required: [true, "Session user_agent is required"],
            trim: true,
        },
        expiresAt: {
            type: Date,
            required: [true, "Session expiresAt is required"],
            trim: true,
        },
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
