import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../config/env.config";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_CONNECTION_STRING);
        console.log("Connected To Database Successfully");

        return conn;
    } catch (error) {
        console.log("Couldn't Connect To Database, Error:", error.message);
    }
};

export default connectDB;
