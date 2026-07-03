import Chatbot from "../models/Chatbot.js";
import crypto from "crypto";

export const createChatbot = async (req, res) => {

    const { chatbotName, websiteUrl, welcomeMessage, themeColor, status } = req.body;
    try {
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

export const getChatbots = async (req, res) => {
    
    const bots = await Chatbot.find({
        userId: req.user._id,
    });

    res.json(bots);
};

export const getChatbot = async (req, res) => {
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