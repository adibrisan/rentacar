import { Router } from "express";
import {
  getUsers,
  updateProfile,
  getUserById,
} from "../controllers/user-controller.js";
import {
  verifyTokenAndAdmin,
  refreshToken,
} from "../middleware/verifyToken.js";

const userRouter = Router();

// GET ALL USERS
userRouter.get("/users", verifyTokenAndAdmin, getUsers);
userRouter.get("/user/:userId", verifyTokenAndAdmin, getUserById);

userRouter.post("/refresh-token", refreshToken);

userRouter.put("/updateProfile/:userId", updateProfile);

export default userRouter;
