import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const getTokenFromReq = (req) => {
  if (req.headers.authorization?.startsWith("Bearer")) {
    return req.headers.authorization.split(" ")[1];
  }

  if (req.cookies?.shaheenToken) {
    return req.cookies.shaheenToken;
  }

  return null;
};

export const protect = async (req, res, next) => {
  const token = getTokenFromReq(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login karein pehle",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User nahi mila",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expire ho gaya, dobara login karein",
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  const token = getTokenFromReq(req);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      req.user = null;
    }
  }

  next();
};