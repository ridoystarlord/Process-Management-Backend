import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";

export const RoutesErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
};
