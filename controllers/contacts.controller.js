const {
  listContacts,
  getContactsById,
  addContactNew,
  updateById,
  deleteById,
} = require("../services/contacts.service");

const { HttpError } = require("../helpers/HttpError");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

const getAllContacts = async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
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
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContactNew(req.body);
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
