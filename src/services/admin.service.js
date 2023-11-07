import jwt from "jsonwebtoken";

import jwtConfig from "../configs/jwt.config.js";
import Admin from "../models/Admin.model.js";

export const getAdmin = async (email, includePassword = false) => {
  try {
    if (includePassword) {
      return await Admin.findOne({ email: email });
    }
    return await Admin.findOne({ email: email }).select("-password");
  } catch (error) {
    console.log("getAdmin: ", error);
    return null;
  }
};

export const createAdmin = async (email, password) => {
  try {
    return await Admin.create({ email, password });
  } catch (error) {
    console.log("createAdmin: ", error);
    return null;
  }
};

export const generateToken = async (email) => {
  try {
    const token = await jwt.sign(
      { email, isAdmin: true },
      jwtConfig.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return token;
  } catch (error) {
    console.log("generateToken: ", error);
  }
};

export const authenticateAdmin = async (admin, password) => {
  try {
    const isAuthenticated = await admin.authenticate(password);
    console.log(isAuthenticated);
    return isAuthenticated;
  } catch (error) {
    console.log("authenticateAdmin: ", error);
    return false;
  }
};
