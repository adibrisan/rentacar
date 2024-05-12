import { Router } from "express";
import { createOrder } from "../controllers/order-controller.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

export const orderRouter = Router();

orderRouter.post("/newOrder", verifyTokenAndAuthorization, createOrder);
