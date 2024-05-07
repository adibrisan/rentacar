import { Car } from "../models/Car.js";

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};
