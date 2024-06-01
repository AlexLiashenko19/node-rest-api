import express from "express";
import { register, login, getCurrent, logout } from "../controllers/auth";
import { schemas } from "../models/user";
import { validateBody } from "../middlewares/validate.body";
import { authenticate } from "../middlewares/authenticate";
import { upload } from "../middlewares/upload";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(schemas.registerSchema), register);
authRouter.post("/login", validateBody(schemas.loginSchema), login);
authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch("/avatars", authenticate, upload.single("avatar"));
