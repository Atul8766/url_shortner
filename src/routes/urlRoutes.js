import express from "express";
import { createShortUrl, getShortUrl } from "../controllers/urlController.js";
import { urlValidation } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/create", urlValidation, createShortUrl);
router.get("/:shortId", getShortUrl);

export default router;
