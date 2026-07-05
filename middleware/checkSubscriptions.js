import User from "../models/User.js";

export const checkSubscription =
    async (req, res, next) => {

        const user =
            await User.findById(
                req.user.id
            );

        if (
            user.currentPlan === "free"
        ) {
            return res.status(403).json({
                message:
                    "Upgrade required",
            });
        }

        if (
            user.subscriptionStatus !==
            "active"
        ) {
            return res.status(403).json({
                message:
                    "Subscription expired",
            });
        }

        next();
    };