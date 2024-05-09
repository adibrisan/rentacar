import { Router } from "express";
import {
  getAllCars,
  getCarFilters,
  getCarById,
} from "../controllers/car-controller.js";

const carRouter = Router();

carRouter.get("/cars", getAllCars);

carRouter.get("/car-details/:carId", getCarById);

carRouter.get("/carFilters", getCarFilters);

export default carRouter;
