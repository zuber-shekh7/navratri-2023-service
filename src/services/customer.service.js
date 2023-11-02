import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const staticOtp = 123456;

export const sendOTP = async (mobileNumber) => {
  try {
    let user = await User.findOne({ mobile: mobileNumber });

    if (!user) {
      user = await user.create({ mobile: mobileNumber });
    }
    // TODO: add login to send OTP to user mobile number
    console.log(`OTP Send : ${user.mobileNumber}`);
  } catch (error) {}
};

export const verifyOTP = async (mobileNumber, otp) => {
  try {
    const user = await User.findOne({ mobile: mobileNumber });

    if (!user || otp != staticOtp) {
      return { success: false };
    }

    const token = jwt.sign({ mobileNumber }, secretKey, { expiresIn: "24h" });

    return { success: true, user, token };
  } catch (error) {}
};

export const fetchCustomer = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {}
};
