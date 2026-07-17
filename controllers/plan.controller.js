import Plan from "../models/plan.js"


export const getplans = async (req, res) => {
    const plans = await Plan.find({ active: true });

    res.json({
        success: true,
        plans,
    });

}


