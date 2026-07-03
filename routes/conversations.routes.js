import express from "express"
import auth from "../middleware/auth.js";
import { getConversationMessages, getConversations, sendHumanReply, deleteConversation } from "../controllers/conversations.controller.js";


const router = express.Router();

// routes/chatRoutes.js

router.get("/", auth, getConversations);

router.get("/:sessionId", auth, getConversationMessages);

router.post("/reply", auth, sendHumanReply);

router.delete("/:sessionId", auth, deleteConversation);



export default router;
