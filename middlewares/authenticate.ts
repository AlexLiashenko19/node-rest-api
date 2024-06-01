import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { User } from "../models/user";
import { HttpError } from "../helpers/index";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
