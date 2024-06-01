import { NextFunction } from "express";
import { HttpError } from "./HttpError";

interface ValidationSchema {
  validate: (arg: any) => { error?: { message: string } };
}

export const validateBody = (schema: ValidationSchema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400));
    }
    next();
  };

  return func;
};
