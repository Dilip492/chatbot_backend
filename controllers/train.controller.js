import Chatbot from "../models/Chatbot.js";
import Knowledge from "../models/Knowledge.js";
import path from "path";
import fs from "fs";



import extractDocxText from "../services/docs.service.js";
import extractPdfText from "../services/pdf.service.js";
import crawlWebsite from "../services/crawler.service.js";
import createEmbeddings from "../services/embedding.service.js";

export const trainWebsite = async (req, res) => {
    try {
        const { chatbotId } = req.params;



        const chatbot = await Chatbot.findById(
            chatbotId
        );

        if (!chatbot) {
            return res.status(404).json({
                success: false,
                message: "Chatbot not found"
            });
        }

        const pages = await crawlWebsite(
            chatbot.websiteUrl
        );

        console.log("pages output" , pages);    

        for (const page of pages) {
            const knowledge = await Knowledge.create({
                chatbotId,
                sourceType: "website",
                sourceUrl: page.url,
                content: page.content,
            });

            await createEmbeddings(
                chatbotId,
                knowledge._id,
                page.content
            );
        }

        res.json({
            success: true,
            message: "Training completed",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};



export const trainFile = async (req, res) => {

    try {
        const { chatbotId } = req.params;

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "File required",
            });
        }

        let content = "";

        const ext =
            path.extname(file.originalname)
                .toLowerCase();

        if (ext === ".pdf") {
            content =
                await extractPdfText(file.path);
        }

        else if (ext === ".docx") {
            content =
                await extractDocxText(file.path);
        }

        else if (ext === ".txt") {

            const fs = await import("fs");

            content = fs.readFileSync(
                file.path,
                "utf8"
            );
        }

        else {
            return res.status(400).json({
                message:
                    "Only PDF, DOCX, TXT supported",
            });
        }

        const knowledge =
            await Knowledge.create({
                chatbotId,
                sourceType: ext.replace(".", ""),
                fileName: file.originalname,
                content,
            });

        await createEmbeddings(
            chatbotId,
            knowledge._id,
            content
        );

        res.json({
            success: true,
            message: "File trained successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}


export const trainText = async (req, res) => {
    try {
        const { chatbotId } = req.params;
        const { customText } = req.body;

        if (!customText || !customText.trim()) {
            return res.status(400).json({
                message: "Text is required"
            });
        }

        const knowledge = await Knowledge.create({
            chatbotId,
            sourceType: "text",
            content: customText
        });

        await createEmbeddings(
            chatbotId,
            knowledge._id,
            customText
        );

        res.status(200).json({
            success: true,
            message: "Text trained successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};