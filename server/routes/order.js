import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  deleteOrderById,
  getAllOrders,
  updateOrderStatusById,
} from "../controllers/order-controller.js";
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";

export const orderRouter = Router();

orderRouter.post("/newOrder", verifyTokenAndAuthorization, createOrder);
orderRouter.get("/orders/:userId", verifyTokenAndAuthorization, getUserOrders);
orderRouter.get("/allOrders", verifyTokenAndAdmin, getAllOrders);
orderRouter.delete(
  "/deleteOrder/:orderId",
  verifyTokenAndAuthorization,
  deleteOrderById
);

orderRouter.put(
  "/updateOrder/:orderId",
  verifyTokenAndAdmin,
  updateOrderStatusById
);
