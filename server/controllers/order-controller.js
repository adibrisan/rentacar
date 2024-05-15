import { Order } from "../models/Order.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

//GET USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).lean().exec();
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

// DELETE ORDER BY ID
export const deleteOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const response = await Order.deleteOne({ _id: orderId });
    if (response.deletedCount === 1) {
      res.status(200).json({ message: "Document deleted successfully" });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
