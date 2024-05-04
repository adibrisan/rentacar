import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyToken = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer token'

    if (!token) {
      throw new Error("No auth header found !");
    }

    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    if (decodedToken) {
      req.user = decodedToken;
      return next();
    } else {
      throw new Error("Token invalid or expired !");
    }
  } catch (err) {
    const refreshToken = req.user.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json("No refresh token found, user is not authenticated.");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Refresh token is invalid.");
      }
      jwt.sign(
        { id: user._id, isAdmin: user?.isAdmin ?? false },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "15m",
        }
      );
      next();
    });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, async () => {
    const currentUser = await User.findById(req.user.id).lean().exec();
    if (
      (req?.user && req.user.id === currentUser._id.toString()) ||
      req.user.isAdmin
    ) {
      next();
    } else {
      res.status(403).json("You don't have permission...");
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

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json("No refresh token found, user is not authenticated.");
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        return res.status(403).json("Refresh token is invalid.");
      }

      const newAccessToken = jwt.sign(
        { id: user.id, isAdmin: user?.isAdmin ?? false },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const existingUser = await User.findById(user.id, {
        password: 0,
        refreshToken: 0,
      })
        .lean()
        .exec();
      res.json({
        ...existingUser,
        accessToken: newAccessToken,
      });
    }
  );
};
