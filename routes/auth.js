const { login, register, reset_password, set_new_password, verify_account} = require("../controllers/auth");
const { login_schema, register_schema, reset_password_schema,set_password_schema} = require("../schema/auth");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const express = require("express");
const router = express.Router();

router.post("/login", validator(login_schema), login);
router.post("/register", validator(register_schema), register);
router.put("/set-new-password", [ validator(set_password_schema), auth ], set_new_password);
router.get("/reset-password", validator(reset_password_schema), reset_password);
router.put("/verify-account", auth, verify_account);

module.exports = router;