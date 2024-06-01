import { HttpError } from "../helpers";
import { NextFunction } from "express";
import { Request, Response } from "express";

export const validateBody = (schema: {
  validate: (arg0: any) => { error: any };
}) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400));
    }
    next();
  };
  return func;
};
