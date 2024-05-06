import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/user-controller.js";
import { check } from "express-validator";

const authRouter = Router();

//REGISTER
authRouter.post(
  "/register",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  register
);

//LOGIN
authRouter.post("/login", login);

//LOGOUT
authRouter.post("/logout", logout);

//FORGOT PASSWORD
authRouter.post("/forgot-password", forgotPassword);

//RESET PASSWORD
authRouter.post("/reset-password/:resetToken", resetPassword);

export default authRouter;
