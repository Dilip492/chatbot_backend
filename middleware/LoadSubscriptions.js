// middleware/loadSubscription.js

import User from "../models/user.js";
import Subscription from "../models/subscription.js";
import Plan from "../models/plan.js";

export default async function loadSubscription(req, res, next) {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let subscription = null;
        let plan = null;

        // Free user
        if (user.currentPlan === "free") {

            plan = await Plan.findOne({ name: "free" });

        } else {

            subscription = await Subscription.findOne({
                userId: user._id,
                status: "active"
            });

            if (subscription) {

                plan = await Plan.findOne({
                    name: subscription.plan
                });

            }

        }

        req.user = user;
        req.subscription = subscription;
        req.plan = plan;

        next();

    } catch (err) {
        next(err);
    }
}