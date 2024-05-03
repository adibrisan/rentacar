import { Router } from "express";
import { register } from "../controllers/user-controller.js";
import { check } from "express-validator";

const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  register
);

export default authRouter;
