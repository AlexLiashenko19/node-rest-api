import fs from "fs/promises";
import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, tempDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: multerConfig,
});
