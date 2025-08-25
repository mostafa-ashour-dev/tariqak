import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../config/env.config";

const connectDB = async () => {
    return mongoose
        .connect(DB_CONNECTION_STRING)
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch((err) => {
            console.log("Database Connection Error:", err.message);
        });
};

export default connectDB;
