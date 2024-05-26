import { NextFunction } from "express";
import { Request, Response } from "express";
import {
  listContacts,
  getContactsById,
  addContactNew,
  updateById,
  deleteById,
} from "../services/contacts.service";
import { HttpError } from "../helpers/index";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas";

interface GetAllContactsQueryParams {
  page?: number;
  limit?: number;
}

export const getAllContacts = async (
  req: Request<{}, {}, {}, GetAllContactsQueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const result = await listContacts(owner, page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getContactsById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id: owner } = req.user;
    const { error } = createContactSchema.validate({ ...req.body });
    if (error) {
      throw HttpError(400);
    }
    const result = await addContactNew(req.body, owner);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const { id } = req.params;
    const result = await updateById(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
