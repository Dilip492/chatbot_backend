import express from "express"
import { googleCallback, logout, profile, register } from '../controllers/auth.controller.js'
import { login } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";
import passport from "passport";
import dotenv from "dotenv"
dotenv.config();

let router = express.Router();

router.post("/register", register);
router.post("/login", login);


router.get("/profile", auth, profile);

router.post("/logout", logout);

// google 
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
    }),
    googleCallback
);



export default router;
