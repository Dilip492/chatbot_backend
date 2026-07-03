import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    chatbotName: {
      type: String,
      required: true,
    },

    websiteUrl: {
      type: String,
      required: true,
    },

    widgetKey: {
      type: String,
      unique: true,
      required: true,
    },

    welcomeMessage: {
      type: String,
      default: "Hi! How can I help you today?",
    },

    themeColor: {
      type: String,
      default: "#4f46e5",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chatbot", chatbotSchema);