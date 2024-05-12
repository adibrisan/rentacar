import mongoose from "mongoose";
import { CarSchema } from "./Car.js";

const orderSchema = new mongoose.Schema({
  userId: String,
  car: CarSchema,
  rentPeriod: [String],
  orderNumber: Number,
  rentalPrice: Number,
  orderStatus: String,
});

export const Order = mongoose.model("Order", orderSchema);
