import Chat from "../models/Chat.js";
import Lead from "../models/Lead.js";
import Chatbot from "../models/Chatbot.js";

import vectorSearch from "../services/vector.service.js";
import askAI from "../services/ai.service.js";

import checkEmail from "../services/emailCheck.service.js"

// import disposableDomains from "disposable-email-domains-js";
import { isDisposableEmail } from "disposable-email-domains-js";

// console.log(disposableDomains);


export const askQuestion = async (req, res) => {
    try {
        const { widgetKey, question, sessionId } = req.body;

        console.log("Question:", question);
        console.log("Widget Key:", widgetKey);

        const chatbot = await Chatbot.findOne({ widgetKey });

        console.log("Chatbot:", chatbot);

        const context = await vectorSearch(
            chatbot._id,
            question
        );

        console.log("Context:", context);

        const answer = await askAI(
            context,
            question
        );

        console.log("Answer:", answer);

        await Chat.create({
            chatbotId: chatbot._id,
            sessionId,
            role: "user",
            message: question,
        });

        await Chat.create({
            chatbotId: chatbot._id,
            sessionId,
            role: "assistant",
            message: answer,
        });

        res.json({
            answer,
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            message: error.message,
        });
    }
};

export const saveLead = async (req, res) => {

    try {

        // console.log("SAVE LEAD HIT");
        // console.log(req.body);
        const {
            widgetKey,
            sessionId,
            name,
            email,
            phone,

        } = req.body;

        // console.log(disposableDomains);

        //  const domain = email.split("@")[1].toLowerCase();

        // if (isDisposableEmail(email)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Temporary email addresses are not allowed."
        //     });
        // }

        const result = await checkEmail(email);

        console.log("email check result", result);

        if (result.email_deliverability.status !== "deliverable") {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            }); 
        }

        const chatbot = await Chatbot.findOne({
            widgetKey
        });

        if (!chatbot) {
            return res.status(404).json({
                message: "Chatbot not found"
            });
        }

        const isleadEmail = await Lead.findOne({ email });

        if (isleadEmail) {
            return res.status(400).json({
                message: "Email already exists. Please use diffrent"
            })
        }

        const lead = await Lead.create({
            chatbotId: chatbot._id,
            sessionId,
            name,
            email,
            phone,

        });

        res.status(201).json(lead);

    } catch (error) {
        console.log("error:", error.message)
        res.status(500).json({
            message: error.message
        });
    }
};


export const getLeads = async (req, res) => {

    // const { chatbotId } = req.params;
    try {
        const chatbots = await Chatbot.find({
            userId: req.user._id
        })
        // console.log("here chatbots",chatbots)

        const chatbotIds = chatbots.map(bot => bot._id);


        const leads = await Lead.find({
            chatbotId: {
                $in: chatbotIds
            }
        }).populate({
            path: "chatbotId",
            select: "chatbotName"
        });

        res.status(200).json({
            success: true,
            leads
        });
        // res.status(200).json(leads);



    } catch (error) {
        console.log("error when get lead", error);
        return res.status(500).json({ message: error.message });
    }
}



export const getChatbot = async (req, res) => {
    console.log("PARAMS:", req.params);

    const chatbot = await Chatbot.findById(req.params.id);

    res.json(chatbot);
};


export const getWidgetConfig = async (req, res) => {
    try {
        const { widgetKey } = req.params;

        const chatbot = await Chatbot.findOne({
            widgetKey,
            status: "active"
        });

        if (!chatbot) {
            return res.status(404).json({
                message: "Widget not found"
            });
        }

        res.json({
            chatbotName: chatbot.chatbotName,
            welcomeMessage: chatbot.welcomeMessage,
            themeColor: chatbot.themeColor
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
