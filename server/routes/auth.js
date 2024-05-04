import { Router } from "express";
import { register, login, logout } from "../controllers/user-controller.js";
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

export default authRouter;
