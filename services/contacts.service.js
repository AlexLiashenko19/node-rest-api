const fs = require("fs").promises;
const { Contact } = require("../models/contact");

async function listContacts(owner, page, limit) {
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, null, {
    skip: 0,
    limit: 2,
  }).populate("owner");
  return result;
}

async function getContactsById(id) {
  const result = Contact.findById(id);
  return result;
}

async function deleteById(id) {
  const result = await Contact.findByIdAndDelete(id);
  return result;
}

async function addContactNew(data, owner) {
  const contact = await Contact.create({ ...data, owner });
  return contact;
}

async function updateById(id, data) {
  const result = await Contact.findByIdAndUpdate(id, data, {
    lean: true,
    new: true,
  });
  return result;
}

module.exports = {
  listContacts,
  getContactsById,
  deleteById,
  addContactNew,
  updateById,
};
