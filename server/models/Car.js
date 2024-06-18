import mongoose from "mongoose";

export const CarSchema = new mongoose.Schema({
  name: String,
  brand: String,
  type: String,
  seats: Number,
  doors: Number,
  year: Number,
  transmission: String,
  pricePerDay: Number,
  pricePerWeek: Number,
  location: String,
  imageURL: String,
  isAvailable: { type: Boolean, default: true },
});

export const Car = mongoose.model("Car", CarSchema);
