import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

export const ErrorMiddleware = (
  error: HttpException,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    res.status(status).json({ status, message });
  } catch (error) {
    next(error);
  }
};
