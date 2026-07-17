// middleware/loadPlan.js

import Plan from "../models/plan.js";

export default async function loadPlan(req, res, next) {
    try {

        const plan = await Plan.findOne({
            name: req.user.currentPlan,
            active: true
        });

        if (!plan) {
            return res.status(404).json({
                message: "Plan not found",
            });
        }

        req.plan = plan;


        next();
    } catch (error) {
        next(error);
    }
}