import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 4777;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const IP_API_KEY = process.env.IP_API_KEY;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export {
    NODE_ENV,
    PORT,
    DB_CONNECTION_STRING,
    IP_API_KEY,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
};
