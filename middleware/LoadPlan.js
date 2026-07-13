// middleware/loadPlan.js

import User from "../models/user.js";

import Plan from "../models/plan.js";
export default async function loadPlan(req, res, next) {

    const user = await User.findById(req.user.id).populate("subscription")

    const plan = await Plan.findOne({
        name: user.currentPlan
    });

    // console.log("user", user.subscription);
    req.user = user;
    req.plan = plan;
    // console.log("plan", req.plan);

    next();
}