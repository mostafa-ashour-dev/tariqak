import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NODE_ENV, PORT } from "./config/env.config";
import connectDB from "./db/connect.db";
import errorHandler from "./middlewares/error-handler.middleware";
import routes from "./router/main.routes";
import missingBodyMiddleware from "./middlewares/missing-body.middleware";
import http from "http";
const app = express();
const server = http.createServer(app);

const origins = [
    "http://localhost:3000",
    "http://localhost:8081",
    "http://localhost:5173",
];
// Middlewares
app.use(
    cors({
        origin: origins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(missingBodyMiddleware);

// Routes
app.use("/api/v1", routes);

// Error handler
app.use(errorHandler);

// App initialization
server.listen(PORT, () => {
    console.log(
        `Server is running on: http://localhost:${PORT}\nEnvironment: ${NODE_ENV}`
    );
    connectDB();
});
