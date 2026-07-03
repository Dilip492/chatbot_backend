import express from "express";
import {
  createChatbot,
  getChatbots,
  getChatbot,
  deleteChatbot,
} from "../controllers/chatbot.controller.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createChatbot);
router.get("/", auth, getChatbots);
router.get("/:id", auth, getChatbot);
router.delete("/:id", auth, deleteChatbot);

export default router;