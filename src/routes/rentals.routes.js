import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schema.js";
import {
  postRentals,
  getRentals,
  deleteRentals,
  finishRentals,
} from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRentals);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", finishRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
