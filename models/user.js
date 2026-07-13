import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    profilePicture: {
      type: String,
      default: '',
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    provider: {
      type: String,
      enum: ['google', 'local'],
      default: 'local',
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },

    currentPlan: {
      type: String,
      default: "free"
    },

    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active"
    }
    ,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;