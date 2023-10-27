import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import customersRoutes from "./routers/customers.js";

dotenv.config();
const app = express();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

const corsOptions = {
  origin: ALLOWED_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/customers", customersRoutes);

export default app;
