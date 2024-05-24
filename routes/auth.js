const express = require("express");
const { register, login, getCurrent, logout } = require("../controllers/auth");
const { schemas } = require("../models/user");
const { validateBody } = require("../middlewares/validate.body");
const { authenticate } = require("../middlewares/authenticate");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch("/avatars", authenticate, upload.single("avatar"));

module.exports = router;
