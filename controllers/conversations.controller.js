import Chat from "../models/chat.js";
import Chatbot from "../models/chatbot.js";
// Chatbot
// Chat

export const getConversations = async (req, res) => {
    try {
        const chatbots = await Chatbot.find({
            userId: req.user._id,
        });

        const chatbotIds = chatbots.map((bot) => bot._id);

        const conversations = await Chat.aggregate([
            {
                $match: {
                    chatbotId: { $in: chatbotIds },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $group: {
                    _id: "$sessionId",
                    chatbotId: { $first: "$chatbotId" },
                    lastMessage: { $first: "$message" },
                    lastRole: { $first: "$role" },
                    updatedAt: { $first: "$createdAt" },
                    totalMessages: { $sum: 1 },
                },
            },

            // Join with leads collection
            {
                $lookup: {
                    from: "leads", // MongoDB collection name
                    localField: "_id", // sessionId
                    foreignField: "sessionId",
                    as: "lead",
                },
            },

            {
                $unwind: {
                    path: "$lead",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $sort: {
                    updatedAt: -1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            conversations,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getConversationMessages = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const messages = await Chat.find({
            sessionId,
        }).sort({
            createdAt: 1,
        });

        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendHumanReply = async (req, res) => {
    try {
        const { sessionId, chatbotId, message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const reply = await Chat.create({
            sessionId,
            chatbotId,
            role: "assistant",
            message,
        });

        res.status(201).json({
            success: true,
            reply,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteConversation = async (req, res) => {
    try {
        const { sessionId } = req.params;

        await Chat.deleteMany({
            sessionId,
        });

        res.status(200).json({
            success: true,
            message: "Conversation deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};