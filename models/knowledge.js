import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema(
  {
chatbotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatbot",
      required: true,
    },

    sourceType: {
      type: String,
      enum: ["website", "pdf", "docx", "txt", "faq", "text"],
      required: true,
    },

    sourceUrl: {
      type: String,
      default: null,
    },

    fileName: {
      type: String,
      default: null,
    },

    pageTitle: {
      type: String,
      default: null,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Knowledge", knowledgeSchema);