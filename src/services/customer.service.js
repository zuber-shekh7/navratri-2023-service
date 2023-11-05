import jwt from "jsonwebtoken";
import moment from "moment";

import User from "../models/User.model.js";
import jwtConfig from "../configs/jwt.config.js";
import { generateOTP } from "../utils/otp.utils.js";

const staticOtp = 123456;
const { JWT_SECRET } = jwtConfig;

export const sendOTP = async (mobileNumber) => {
  try {
    let user = await User.findOne({ mobile: mobileNumber });

    if (!user) {
      user = await user.create({ mobile: mobileNumber });
    }

    const OTP = generateOTP();
    user.mobileOTP = OTP;
    user.mobileOTPExpiry = moment().add(1, "minute");
    await user.save();

    // TODO: add login to send OTP to user mobile number
    console.log(`OTP Send : ${user.mobileNumber}`);
  } catch (error) {}
};

export const verifyOTP = async (mobileNumber, otp) => {
  try {
    const user = await User.findOne({ mobile: mobileNumber });

    if (!user) {
      return { success: false };
    }

    // check mobileOTP time expiry
    if (moment().isAfter(moment(user.mobileOTPExpiry))) {
      return { success: false, message: "OTP verification timeout." };
    }

    // OTP comparison
    if (user.mobileOTP !== "" + otp) {
      return {
        success: false,
      };
    }

    const token = jwt.sign({ mobileNumber }, JWT_SECRET, { expiresIn: "24h" });

    (user.mobileOTP = null),
      (user.mobileOTPExpiry = null),
      (user.isMobileVerified = true);

    await user.save();

    return {
      success: true,
      user: await User.findById(user._id).select("-mobileOTP -mobileOTPExpiry"),
      token,
    };
  } catch (error) {
    console.log("verifyOTP: ", error);
  }
};

export const fetchCustomer = async (id) => {
  try {
    return await User.findById(id).select("-mobileOTP -mobileOTPExpiry");
  } catch (error) {}
};
