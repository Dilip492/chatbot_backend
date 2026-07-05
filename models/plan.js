// models/Plan.js

import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    chatbotLimit: {
      type: Number,
      default: 1,
    },

    trainingLimit: {
      type: Number,
      default: 5,
    },

    messageLimit: {
      type: Number,
      default: 100,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Plan", planSchema);