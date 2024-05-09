import { Car } from "../models/Car.js";
import { carFilterHandler } from "../utils/helper.js";

// GET ALL CARS
export const getAllCars = async (req, res) => {
  const filter = req.query;
  const mongoQueryFilter = carFilterHandler(filter);
  try {
    const cars = await Car.find(mongoQueryFilter);
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error getting cars." });
  }
};

//GET CAR BY ID
export const getCarById = async (req, res) => {
  const id = req.params.carId;
  try {
    const car = await Car.findById(id);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error getting car." });
  }
};

//GET CAR FILTERS
export const getCarFilters = async (req, res) => {
  try {
    const carFilters = await Car.aggregate([
      {
        $group: {
          _id: null,
          location: { $addToSet: "$location" },
          type: { $addToSet: "$type" },
          seats: { $addToSet: "$seats" },
        },
      },
      {
        $project: {
          _id: 0,
          location: 1,
          type: 1,
          seats: 1,
        },
      },
    ]);
    if (carFilters.length) {
      res.status(200).json(carFilters[0]);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error getting car filters." });
  }
};
