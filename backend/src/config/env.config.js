import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 47;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
export { NODE_ENV, PORT, DB_CONNECTION_STRING };
