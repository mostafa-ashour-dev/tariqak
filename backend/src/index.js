import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NODE_ENV, PORT } from "./config/env.config";
import connectDB from "./database/connect.db";
import errorHandler from "../../../../ecaw-dev/projects/AcalynIQ/server/src/errors/errorHandler";
import ResponseError from "./classes/response-error.class";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    const { pass } = req.query;
    if (pass === "tariqak") {
        res.status(200).json({ message: "Welcome to AcalynIQ API" });
        return;
    }
    throw new ResponseError(401, "error", "Unauthorized");
});

// Error handler
app.use(errorHandler);

// App initialization
app.listen(PORT, () => {
    console.log(
        `Server is running on: http://localhost:${PORT}\nEnvironment: ${NODE_ENV}`
    );
    connectDB();
});
