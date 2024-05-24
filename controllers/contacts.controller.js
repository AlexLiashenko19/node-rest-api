const {
  listContacts,
  getContactsById,
  addContactNew,
  updateById,
  deleteById,
} = require("../services/contacts.service");

const { HttpError } = require("../helpers/index");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

const getAllContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const result = await listContacts(owner, page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
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

const deleteContact = async (req, res) => {
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

const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { error } = createContactSchema.validate({ ...req.body });
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContactNew(req.body, owner);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
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

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
