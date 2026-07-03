import express from "express"
import { profile, register } from '../controllers/auth.controller.js'
import { login } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";


let router = express.Router();

router.post("/register", register);
router.post("/login", login);


router.get("/profile", auth, profile);




export default router;
