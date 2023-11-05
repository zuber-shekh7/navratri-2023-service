import expressAsyncHandler from "express-async-handler";

import {
  verifyOTP,
  sendOTP,
  fetchCustomer,
} from "../services/customer.service.js";

export const sendOtp = expressAsyncHandler(async (req, res) => {
  const { mobileNumber } = req.body;

  await sendOTP(mobileNumber);

  return res.json({
    message: "OTP sent successfully",
  });
});

export const verifyOtp = expressAsyncHandler(async (req, res) => {
  const { mobileNumber, otp } = req.body;
  const { success, user, token, message } = await verifyOTP(mobileNumber, otp); //validate both fields

  if (success) {
    return res.json({
      message: message ?? "OTP verified successfully",
      user,
      token,
    });
  }

  return res.json({
    message: message ?? "OTP verification failed",
  });
});

export const getCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await fetchCustomer(id);

  if (customer) {
    return res.json({
      customer,
    });
  }

  return res.status(404).json({ message: "Customer not found" });
};
