import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { PORT } from "./Config";
import { RateLimiter } from "./Middleware/APIRateLimiter";
import { RoutesErrorHandler } from "./Middleware/RoutesErrorHandler";
import Routes from "./Routes";
import GlobalErrorHandler from "./Utils/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(RateLimiter);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/api/v1", Routes);

app.get("/", (req, res) => {
  res.send("Welcome to Process Management API");
});

app.use(RoutesErrorHandler);
app.use(GlobalErrorHandler);

app.listen(PORT, () => {
  console.log(`Process Management Running  on ${PORT}`);
});
