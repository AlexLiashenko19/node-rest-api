import { NextFunction } from "express";
import { Request, Response } from "express";
import { IUser } from "./lib/user.types.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

const DB_HOST = process.env.DB_HOST as string;

import { contactsRouter } from "./routes/contacts.router.js";
import { authRouter } from "./routes/auth.js";

export const app = express();

declare module "express-serve-static-core" {
  interface Request {
    user: IUser;
  }
}

mongoose.set("strictQuery", true);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_: any, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error: any) => {
    console.log(error.message);
    process.exit(1);
  });
