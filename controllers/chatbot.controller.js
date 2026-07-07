import Chatbot from "../models/Chatbot.js";
import crypto from "crypto";

export const createChatbot = async (req, res) => {

    const { chatbotName, websiteUrl, welcomeMessage, themeColor, status } = req.body;
    try {

        if (req.user.currentPlan !== "free" && req.user.subscriptionStatus === "expired") {
            return res.status(403).json({
                success: false,
                message: "Please renew your subscription",
            });
        }


        const chatbot = await Chatbot.create({
            userId: req.user._id,
            chatbotName,
            websiteUrl,
            widgetKey: crypto.randomUUID(),
            welcomeMessage,
            themeColor,
            status

        });

        res.status(201).json(chatbot);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const UpdateChatbot = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            chatbotName,
            websiteUrl,
            welcomeMessage,
            themeColor,
            status
        } = req.body;

        const chatbot = await Chatbot.findById(id);

        if (!chatbot) {
            return res.status(404).json({
                success: false,
                message: "Chatbot not found",
            });
        }

        // Ownership check
        if (chatbot.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        chatbot.chatbotName = chatbotName || chatbot.chatbotName;
        chatbot.websiteUrl = websiteUrl || chatbot.websiteUrl;
        chatbot.welcomeMessage = welcomeMessage || chatbot.welcomeMessage;
        chatbot.themeColor = themeColor || chatbot.themeColor;

        if (status) {
            chatbot.status = status;
        }

        const updatedChatbot = await chatbot.save();

        res.status(200).json({
            success: true,
            message: "Chatbot updated successfully",
            chatbot: updatedChatbot,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getChatbots = async (req, res) => {

    const bots = await Chatbot.find({
        userId: req.user._id,
    });

    res.json(bots);
};

export const getChatbot = async (req, res) => {
    console.log("chatbotId", req.params.id);
    const bot = await Chatbot.findById(
        req.params.id
    );

    res.json(bot);
};

export const deleteChatbot = async (req, res) => {
    await Chatbot.findByIdAndDelete(
        req.params.id
    );

    res.json({
        success: true,
    });
};