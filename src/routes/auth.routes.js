import express from "express";

import { sendOtp, verifyOtp } from "../controllers/customers.controller.js";
import {
  adminLogin,
  adminRegistration,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/customer/otp/send", sendOtp);
router.post("/customer/otp/verify", verifyOtp);
router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegistration);

export default router;
