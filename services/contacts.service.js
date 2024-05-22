const fs = require("fs").promises;
const { Contact } = require("../models/contact");

async function listContacts() {
  const data = await Contact.find();
  return data;
}

async function getContactsById(id) {
  const result = Contact.findById(id);
  return result;
}

async function deleteById(id) {
  const result = await Contact.findByIdAndDelete(id);
  return result;
}

async function addContactNew(data) {
  const contact = await Contact.create(data);
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
