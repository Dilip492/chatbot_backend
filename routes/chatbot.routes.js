import express from "express";
import {
  createChatbot,
  getChatbots,
  getChatbot,
  deleteChatbot,
  UpdateChatbot,
} from "../controllers/chatbot.controller.js";

import auth from "../middleware/auth.js";
import { checkSubscription } from "../middleware/checkSubscriptions.js";
import loadPlan from "../middleware/LoadPlan.js";
import { getLeads } from "../controllers/widget.controller.js";
import loadSubscription from "../middleware/LoadSubscriptions.js";
import checkLimit from "../middleware/CheckLimit.js";

const router = express.Router();

router.get('/getleads', auth, getLeads);

router.post("/", auth, loadSubscription, checkLimit, createChatbot);
router.put("/update/:id", auth, UpdateChatbot);
router.get("/", auth, getChatbots);
router.get("/:id", auth, getChatbot);
router.delete("/:id", auth, deleteChatbot);


export default router;