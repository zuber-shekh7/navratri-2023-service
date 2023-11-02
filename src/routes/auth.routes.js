import express from "express";

import { sendOtp, verifyOtp } from "../controllers/customers.controller.js";

const router = express.Router();

router.post("/customer/otp/send", sendOtp);
router.post("/customer/otp/verify", verifyOtp);

export default router;
