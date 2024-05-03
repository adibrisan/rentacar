import { validationResult } from "express-validator";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { HttpError } from "../models/HttpError.js";
import { User } from "../models/User.js";

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

  try {
    await newUser.save();
  } catch (err) {
    next(new HttpError("Could not create user, please try again.", 500));
  }
  let accessToken;
  try {
    accessToken = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed with jwt,try again later.", 500)
    );
  }
  const { password: pass, ...other } = newUser._doc;
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
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed with jwt,try again later.", 500)
    );
  }

  const { password: pass, ...other } = existingUser._doc;
  res.status(200).json({ ...other, accessToken });
};
