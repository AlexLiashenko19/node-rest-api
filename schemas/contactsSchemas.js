const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{2}-\d{2}$/)
    .required(),
  favorite: Joi.boolean().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{2}-\d{2}$/)
    .optional(),
  favorite: Joi.boolean().optional(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
};
