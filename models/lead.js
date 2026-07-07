import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    chatbotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatbot",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },

    name: String,

    email: String,

    phone: String,

    // message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);