import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { StatusCodes } from "http-status-codes";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "User not found" });
      }

      req.user = user;

      next();
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth Error:", error);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Not authorized, invalid token" });
  }
};
