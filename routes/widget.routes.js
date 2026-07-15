import express from "express";
import {
  askQuestion,
  // getLeads,
  getWidgetConfig,
  saveLead,
} from "../controllers/widget.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/ask", askQuestion);
router.post("/lead", saveLead);

// remove the this route 
// router.get('/getleads', auth, getLeads)


router.get('/config/:widgetKey', getWidgetConfig);
// dynamic routes last
// router.get("/:id", getChatbot);

export default router;