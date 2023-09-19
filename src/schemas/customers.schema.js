import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const customersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().pattern(/^\d+$/).min(10).max(11).required(),
  cpf: joi.string().pattern(/^\d+$/).min(11).max(11).required(),
  birthday: joi.date().format(["YYYY-MM-DD"]).required(),
});
