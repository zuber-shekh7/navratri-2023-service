import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt.config.js";

const authMiddleware = (req, res, next) => {
  try {
    // extracting token
    const token = req.header("authorization");

    // check if token exists
    if (!token) {
      return res.status(401).json({ message: "Authorization Failed" });
    }

    const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authorization Failed" });
  }
};

export default authMiddleware;
