import Plan from "../models/plan.js"
import razorpay from "../config/razorpay.js"

import crypto from "crypto";
import Subscription from "../models/subscription.js";
import User from "../models/user.js";
import { createNotification } from "../services/notification.service.js";

export const createOrder = async (req, res) => {
    const { planName } = req.body;

    const plan = await Plan.findOne({
        name: planName,
    });

    if (!plan) {
        return res.status(404).json({
            message: "Plan not found",
        });
    }

    const order = await razorpay.orders.create({
        amount: plan.price * 100,
        currency: "INR",
    });

    res.json({
        success: true,
        order,
    });
}


export const verifyPayment = async (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        planName,
    } = req.body;

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_SECRET
        )
        .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({
            message: "Invalid Payment",
        });
    }

    const plan = await Plan.findOne({
        name: planName,
    });

    const subscription =
        await Subscription.create({
            userId: req.user._id,
            plan: plan.name,
            amount: plan.price,
            razorpayOrderId:
                razorpay_order_id,
            razorpayPaymentId:
                razorpay_payment_id,
            startDate: new Date(),
            endDate: new Date(
                Date.now() +
                30 * 24 * 60 * 60 * 1000
            ),
        });

    // createNotification
    await createNotification({
        user: req.user._id,
        type: "success",
        title: "Payment Successful",
        message: `Welcome to the ${planName} Plan.`,
        actionUrl: "/billing",
    });

    await User.findByIdAndUpdate(
        req.user._id,
        {
            subscription:
                subscription._id,
            currentPlan: plan.name,
            subscriptionStatus:
                "active",
        }
    );

    res.json({
        success: true,
    });
};


export const getbilling = async (req, res) => {
    
    res.json({

        success: true,

        subscription: {

            status: req.subscription?.status || "free",

            startDate: req.subscription?.startDate,
            
            endDate: req.subscription?.endDate,

            amount: req.subscription?.amount || 0,

            plan: req.plan.name

        },

        paymentHistory: [

            {

                amount: req.subscription?.amount,

                paymentId: req.subscription?.razorpayPaymentId,

                date: req.subscription?.createdAt,

                status: req.subscription?.status

            }

        ]

    });
}