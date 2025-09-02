import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NODE_ENV, PORT } from "./config/env.config";
import connectDB from "./database/connect.db";
import errorHandler from "../../../../ecaw-dev/projects/AcalynIQ/server/src/errors/errorHandler";
import routes from "./router/main.routes";
import messingBodyMiddleware from "./middlewares/missing-body.middleware";

const app = express();

const origins = [
    "http://localhost:3000",
    "http://localhost:8081",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8081",
]
// Middlewares
app.use(cors(
    {
        origin: origins,
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(messingBodyMiddleware);

// Routes
app.use("/api/v1", routes);

// Error handler
app.use(errorHandler);

// App initialization
app.listen(PORT, () => {
    console.log(
        `Server is running on: http://localhost:${PORT}\nEnvironment: ${NODE_ENV}`
    );
    connectDB();
});
