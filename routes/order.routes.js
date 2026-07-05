import express from "express"
import { createOrder, verifyPayment } from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();



router.post("/create-order", auth , createOrder);
router.post("/verifypayment", auth,  verifyPayment);



export default router;