import { Router } from "express";
import { getUsers } from "../controllers/user-controller.js";
import {
  verifyTokenAndAdmin,
  refreshToken,
} from "../middleware/verifyToken.js";

const userRouter = Router();

// GET ALL USERS
userRouter.get("/users", verifyTokenAndAdmin, getUsers);

userRouter.post("/refresh-token", refreshToken);

export default userRouter;
