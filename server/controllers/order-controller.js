import { Order } from "../models/Order.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};
