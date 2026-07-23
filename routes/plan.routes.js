import express from "express";
import { getCurrentPlan, getplans } from "../controllers/plan.controller.js";
import auth from "../middleware/auth.js";
import loadSubscription from "../middleware/LoadSubscriptions.js";

const router = express.Router();





router.get("/plans", getplans)

router.get("/plans/current", auth, loadSubscription, getCurrentPlan);



export default router;