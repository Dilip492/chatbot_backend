// models/Subscription.js

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    plan: {
      type: String,
      enum: ["pro", "business"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Subscription", subscriptionSchema);