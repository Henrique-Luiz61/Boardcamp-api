import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { customersSchema } from "../schemas/customers.schema.js";
import {
  postCustomer,
  getCustomers,
  getCustomerById,
} from "../controllers/customers.controller.js";

const customerRouter = Router();

customerRouter.post(
  "/customers",
  validateSchema(customersSchema),
  postCustomer
);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);

export default customerRouter;
