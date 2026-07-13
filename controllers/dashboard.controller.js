import Chatbot from "../models/chatbot.js";
import Lead from "../models/lead.js";
import Chat from "../models/chat.js";

export const dashboardstats = async (req, res) => {

    try {
        const userId = req.user._id;

        // User chatbots
        const chatbots = await Chatbot.find({ userId });
        const chatbotIds = chatbots.map(bot => bot._id);

        // Current totals
        const totalChatbots = chatbots.length;
        const activeChatbots = chatbots.filter(
            bot => bot.status === "active"
        ).length;

        const totalLeads = await Lead.countDocuments({
            chatbotId: { $in: chatbotIds }
        });

        const totalChats = await Chat.countDocuments({
            chatbotId: { $in: chatbotIds }
        });

        // -----------------------
        // Date Ranges
        // -----------------------

        const now = new Date();

        const currentMonthStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const previousMonthStart = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
        );

        const previousMonthEnd = new Date(
            now.getFullYear(),
            now.getMonth(),
            0,
            23,
            59,
            59
        );

        // -----------------------
        // Current Month Data
        // -----------------------

        const currentMonthLeads = await Lead.countDocuments({
            chatbotId: { $in: chatbotIds },
            createdAt: {
                $gte: currentMonthStart
            }
        });

        const currentMonthChats = await Chat.countDocuments({
            chatbotId: { $in: chatbotIds },
            createdAt: {
                $gte: currentMonthStart
            }
        });

        const currentMonthChatbots = await Chatbot.countDocuments({
            userId,
            createdAt: {
                $gte: currentMonthStart
            }
        });

        // -----------------------
        // Previous Month Data
        // -----------------------

        const previousMonthLeads = await Lead.countDocuments({
            chatbotId: { $in: chatbotIds },
            createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd
            }
        });

        const previousMonthChats = await Chat.countDocuments({
            chatbotId: { $in: chatbotIds },
            createdAt: {
                $gte: previousMonthStart,   
                $lte: previousMonthEnd
            }
        });

        const previousMonthChatbots = await Chatbot.countDocuments({
            userId,
            createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd
            }
        });

        // -----------------------
        // Trend Calculator
        // -----------------------

        const calculateTrend = (current, previous) => {
            if (previous === 0) {
                return current > 0 ? 100 : 0;
            }

            return Number(
                (((current - previous) / previous) * 100).toFixed(1)
            );
        };

        const chatbotTrend = calculateTrend(
            currentMonthChatbots,
            previousMonthChatbots
        );

        const leadsTrend = calculateTrend(
            currentMonthLeads,
            previousMonthLeads
        );

        const chatsTrend = calculateTrend(
            currentMonthChats,
            previousMonthChats
        );

        res.status(200).json({
            totalChatbots,
            activeChatbots,
            totalLeads,
            totalChats,

            trends: {
                chatbotTrend,
                leadsTrend,
                chatsTrend
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }

}