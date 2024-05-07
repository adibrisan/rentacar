import { Router } from "express";
import { getAllCars } from "../controllers/car-controller.js";

const carRouter = Router();

carRouter.get("/cars", getAllCars);

export default carRouter;
