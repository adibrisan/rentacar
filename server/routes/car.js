import { Router } from "express";
import { getAllCars, getCarFilters } from "../controllers/car-controller.js";

const carRouter = Router();

carRouter.get("/cars", getAllCars);

carRouter.get("/carFilters", getCarFilters);

export default carRouter;
