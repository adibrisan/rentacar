import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
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
});

export const Car = mongoose.model("Car", CarSchema);
