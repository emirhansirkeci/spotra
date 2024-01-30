import express from "express";
import { handleTranslationRequest } from "../../controllers/translateController.js";

const router = express.Router();

router.post("/", handleTranslationRequest);

export default router;
