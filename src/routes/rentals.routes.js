import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schema.js";
import {
  postRentals,
  deleteRentals,
} from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
