import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 47;
export { NODE_ENV, PORT };
