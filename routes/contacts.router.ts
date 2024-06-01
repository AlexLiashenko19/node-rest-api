import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contacts.controller";
import { authenticate } from "../middlewares/authenticate";

export const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, getOneContact);

contactsRouter.delete("/:id", authenticate, deleteContact);

contactsRouter.post("/", authenticate, createContact);

contactsRouter.put("/:id", authenticate, updateContact);
