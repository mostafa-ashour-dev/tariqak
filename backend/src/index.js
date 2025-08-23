import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NODE_ENV, PORT } from "./config/env.config.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes

// App initialization
app.listen(PORT, () => {
    console.log(
        `Server is running on: http://localhost:${PORT}\nEnvironment: ${NODE_ENV}\n`
    );
});
