import express from "express";
import auth from "../middleware/auth.js";
import { dashboardstats } from "../controllers/dashboard.controller.js";
// import { dashboardstats } from "../controllers/dashboard.controller.js"

const router = express.Router();

router.get("/", auth, dashboardstats);

export default router;