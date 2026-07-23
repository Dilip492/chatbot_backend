import express from "express"
import { createOrder, getbilling, verifyPayment } from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";
import loadSubscription from "../middleware/LoadSubscriptions.js";
const router = express.Router();



router.post("/create-order", auth , createOrder);
router.post("/verifypayment", auth,  verifyPayment);

router.get("/billing" , auth , loadSubscription , getbilling )



export default router;