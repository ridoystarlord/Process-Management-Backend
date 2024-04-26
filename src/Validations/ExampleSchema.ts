import Joi from "joi";

export const ExampleSchema = {
  getExampleData: Joi.object({
    name: Joi.string().required(),
    id: Joi.number().required(),
  }),
};
