import dotenv from "dotenv";

dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_SECRET: process.env.ADMIN_SECRET,
};
