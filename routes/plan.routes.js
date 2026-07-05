import express from "express";
import { getplans } from "../controllers/plan.controller.js";

const router = express.Router();





router.get("/plans", getplans)



export default router;