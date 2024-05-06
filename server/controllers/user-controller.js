import { validationResult } from "express-validator";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { HttpError } from "../models/HttpError.js";
import { User } from "../models/User.js";
import nodemailer from "nodemailer";

//REGISTER
export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed. Try again later.", 500);

    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );

    return next(error);
  }

  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(
      password,
      `${process.env.PASSWORD_SECRET_KEY}`
    ),
  });
  const refreshToken = jwt.sign(
    {
      id: newUser._id,
      isAdmin: newUser?.isAdmin ?? false,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
  try {
    newUser.refreshToken = refreshToken;
    await newUser.save();
  } catch (err) {
    next(new HttpError("Could not create user, please try again.", 500));
  }
  let accessToken;
  try {
    accessToken = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser?.isAdmin ?? false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed with jwt,try again later.", 500)
    );
  }
  const { password: pass, ...other } = newUser._doc;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({ ...other, accessToken });
};

//LOGIN
export const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Logining in failed. Try again later.", 500);

    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );

    return next(error);
  }

  const hashedPassword = CryptoJS.AES.decrypt(
    existingUser.password,
    process.env.PASSWORD_SECRET_KEY.toString()
  );
  const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (decryptedPassword !== password) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }
  let accessToken;
  try {
    accessToken = jwt.sign(
      {
        id: existingUser._id,
        isAdmin: existingUser?.isAdmin ?? false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed with jwt,try again later.", 500)
    );
  }
  const refreshToken = existingUser.refreshToken;
  await existingUser.save();
  const { password: pass, ...other } = existingUser._doc;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ ...other, accessToken });
};

//GET ALL USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
};

//LOGOUT
export const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout internal error." });
  }
};

//FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).lean().exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.RESET_PASS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TRANSPORTER_EMAIL,
        pass: process.env.TRANSPORTER_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.TRANSPORTER_EMAIL,
      to: email,
      subject: "Password Reset for rentAcar",
      html: `<p>You requested a password reset for rentAcar app. Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Email sending failed" });
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Email sent successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const token = req.params.resetToken;
  try {
    const decodedToken = jwt.verify(token, process.env.RESET_PASS_TOKEN);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      `${process.env.PASSWORD_SECRET_KEY}`
    );
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};
