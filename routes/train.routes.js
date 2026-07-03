import express from "express";
import auth from "../middleware/auth.js";
import { trainWebsite , trainFile  , trainText} from "../controllers/train.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

//  Train from the website 
router.post("/website/:chatbotId", auth, trainWebsite);

// Train from the file 
router.post("/file/:chatbotId", auth, upload.single('file'), trainFile);

// Train from the text
router.post("/text/:chatbotId", auth, trainText);



export default router;