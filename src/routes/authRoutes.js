import express from "express";
import { login, register } from "../controllers/authController.js";
import { registerValidation } from "../middleware/validationMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", registerValidation, register);

export default router;
