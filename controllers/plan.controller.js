import Plan from "../models/plan.js"
import Chatbot from "../models/chatbot.js"
import Knowledge from "../models/knowledge.js"
import Chat from "../models/chat.js"
import Lead from "../models/lead.js"


export const getplans = async (req, res) => {
    const plans = await Plan.find({ active: true });

    res.json({
        success: true,
        plans,
    });

}


export const getCurrentPlan = async (req, res) => {

    const chatbots = await Chatbot.find(
        { userId: req.user._id },
        "_id"
    );

    const chatbotIds = chatbots.map(bot => bot._id);

    const [chatbotCount, trainingCount, messageCount] = await Promise.all([
        chatbot.countDocuments({
            userId: req.user._id
        }),

        Knowledge.countDocuments({
            chatbotId: { $in: chatbotIds }
        }),

        Chat.countDocuments({
            chatbotId: { $in: chatbotIds }
        }),

        Lead.countDocuments({
            chatbotId: { $in: chatbotIds }
        })
    ])

    res.json({

        success: true,

        currentPlan: req.plan.name,

        price: req.plan.price,

        limits: {

            chatbotLimit: req.plan.chatbotLimit,

            trainingLimit: req.plan.trainingLimit,

            messageLimit: req.plan.messageLimit

        },

        usage: {

            chatbots: chatbotCount,

            trainings: trainingCount,

            messages: messageCount

        }

    });
}


