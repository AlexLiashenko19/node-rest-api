const express = require("express");
const { register, login } = require("../controllers/auth");
const { schemas } = require("../models/user");
const { validateBody } = require("../middlewares/validate.body");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;
