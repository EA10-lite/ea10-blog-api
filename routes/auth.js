const { login, register, reset_password, set_new_password, verify_account} = require("../controllers/auth");
const { login_schema, register_schema, reset_password_schema,set_password_schema} = require("../schema/auth");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and account management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the User post.
 *         username:
 *             type: string
 *             minLength: 4
 *             maxLength: 50
 *         password:
 *             type: string
 *             minLength: 8
 *             pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
 *         email:
 *             type: string
 *             format: email
 *       required:
 *         - username
 *         - password
 *         - email
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and generate an access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 50
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for authentication
 */
router.post("/login", validator(login_schema), login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 50
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       '200':
 *         description: User registered successfully
 */
router.post("/register", validator(register_schema), register);

/**
 * @swagger
 * /api/auth/set-new-password:
 *   post:
 *     summary: Reset password
 *     description: Reset the password for a user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              password:
 *                 type: string
 *                 minLength: 8
 *                 pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
 *              confirm_password:
 *                 type: string
 *                 minLength: 8
 *                 pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Password reset email sent successfully
 */
router.put("/set-new-password", [ validator(set_password_schema), auth ], set_new_password);

/**
 * @swagger
 * /api/auth/send-reset-password-email:
 *   post:
 *     summary: Send reset password email
 *     description: Send an email with a reset password link to the user's registered email address
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Reset password email sent successfully
 */
router.post("/send-reset-password-email", validator(reset_password_schema), reset_password);

/**
 * @swagger
 * /api/auth/verify-account:
 *   put:
 *     summary: Verify account
 *     description: Verify the user account using the verification code
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             required:
 *               - verificationCode
 *     responses:
 *       '200':
 *         description: Account verified successfully
 */
router.put("/verify-account", auth, verify_account);

module.exports = router;