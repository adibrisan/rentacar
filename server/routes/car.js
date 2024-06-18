import { Router } from "express";
import {
  getAllCars,
  getCarFilters,
  getCarById,
  editCarAvailability,
} from "../controllers/car-controller.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

const carRouter = Router();

carRouter.get("/cars", getAllCars);

carRouter.get("/car-details/:carId", getCarById);

carRouter.get("/carFilters", getCarFilters);

carRouter.put("/car-details/:carId", verifyTokenAndAdmin, editCarAvailability);

export default carRouter;
