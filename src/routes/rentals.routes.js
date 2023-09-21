import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schema.js";
import { postRentals } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRentals);

export default rentalsRouter;
