import express from "express";

import { getCustomer } from "../controllers/customers.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getCustomer);

export default router;
