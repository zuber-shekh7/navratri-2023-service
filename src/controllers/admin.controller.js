import expressAsyncHandler from "express-async-handler";

import {
  authenticateAdmin,
  createAdmin,
  generateToken,
  getAdmin,
} from "../services/admin.service.js";
import jwtConfig from "../configs/jwt.config.js";

export const adminLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await getAdmin(email, true);

  if (admin) {
    if (await authenticateAdmin(admin, password)) {
      const token = await generateToken(email);

      return res.json({
        status: "Success",
        admin: await getAdmin(email),
        token,
      });
    }

    return res.status(400).json({
      status: "Failed",
      error: "Invalid email or password",
    });
  }

  return res.status(400).json({
    status: "Failed",
    error: "Invalid email or password",
  });
});

export const adminRegistration = expressAsyncHandler(async (req, res) => {
  const { email, password, secret } = req.body;

  if (secret !== jwtConfig.ADMIN_SECRET) {
    return res.status(401).json({
      status: "Failed",
      error: "Unauthorised Access",
    });
  }

  let admin = await getAdmin(email);

  if (admin) {
    return res.status(400).json({
      status: "Failed",
      error: `Admin already exists with ${email} email`,
    });
  }

  admin = await createAdmin(email, password);

  return res.status(201).json({
    status: "Success",
    message: "Admin created successfully",
  });
});
