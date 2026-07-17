// middleware/checkLimit.js

import Chatbot from "../models/chatbot.js";

export default async function checkLimit(req, res, next) {

    try {

        const chatbotCount = await Chatbot.countDocuments({
            userId: req.user._id
        });

        const limit = req.plan.chatbotLimit;

        console.log("limit" , req.plan.chatbotLimit);
        console.log("chatbotCount" , chatbotCount);

        if (chatbotCount >= limit) {

            return res.status(403).json({

                success: false,

                message: "Chatbot limit reached",

                current: chatbotCount,

                limit

            });

        }

        next();

    } catch (err) {

        next(err);

    }

}