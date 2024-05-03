import jwt from "jsonwebtoken";
import { HttpError } from "../models/HttpError.js";

export const verifyToken = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer token'

    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.user = decodedToken;
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed !", 403);
    return next(error);
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You don't have permission.");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You don't have permission.");
    }
  });
};
