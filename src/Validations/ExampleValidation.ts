import { RequestHandler } from "express";

import { validator } from "../Utils/Validator";

import { ExampleSchema } from "./ExampleSchema";

export const getExampleDataValidation: RequestHandler = (req, res, next) =>
  validator(ExampleSchema.getExampleData, req.body, next);
