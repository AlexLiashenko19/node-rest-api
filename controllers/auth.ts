import fs from "fs/promises";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { Request, Response } from "express";
import path from "path";
import { User } from "../models/user";
import { HttpError } from "../helpers/index";

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const SECRET_KEY = process.env.SECRET_KEY as string;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email) {
    throw HttpError(401);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

export const getCurrent = async (req: Request, res: Response) => {
  const { email, password } = req.user;

  res.json({
    email,
    password,
  });
};

export const logout = async (req: Request, res: Response) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    message: "Logout success",
  });
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpError(400);
  }
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};
