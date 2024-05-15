import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  deleteOrderById,
} from "../controllers/order-controller.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

export const orderRouter = Router();

orderRouter.post("/newOrder", verifyTokenAndAuthorization, createOrder);
orderRouter.get("/orders/:userId", verifyTokenAndAuthorization, getUserOrders);
orderRouter.delete(
  "/deleteOrder/:orderId",
  verifyTokenAndAuthorization,
  deleteOrderById
);
