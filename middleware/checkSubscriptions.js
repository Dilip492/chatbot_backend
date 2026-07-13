import User from "../models/user.js";

export const checkSubscription =
    async (req, res, next) => {

        const user =
            await User.findById(
                req.user.id
            );

        if (user.currentPlan === "free") {
            return res.status(403).json({
                message:
                    "Your current plan does not allow this feature. Please upgrade to Pro or Enterprise.",
            });
        }

        if (user.subscriptionStatus !== "active") {
            return res.status(403).json({
                message:
                    "Your subscription has expired. Please renew your plan to continue.",
            });
        }

        next();
    };