import User from "../models/user.js";
import Plan from "../models/plan.js";
import Chatbot from "../models/chatbot.js";
import Knowledge from "../models/knowledge.js";
import Usage from "../models/usage.js";

class PlanService {

    // Get user's current plan
    async getPlan(userId) {

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const plan = await Plan.findOne({
            name: user.currentPlan
        });

        if (!plan) {
            throw new Error("Plan not found");
        }

        return plan;
    }

    // Check chatbot limit
    async checkChatbotLimit(userId) {

        const plan = await this.getPlan(userId);

        const chatbotCount = await Chatbot.countDocuments({
            user: userId
        });

        if (chatbotCount >= plan.chatbotLimit) {
            throw new Error(
                `Your ${plan.name} plan allows only ${plan.chatbotLimit} chatbot(s).`
            );
        }

        return true;
    }

    // Check training limit
    async checkTrainingLimit(userId) {

        const plan = await this.getPlan(userId);

        const trainingCount = await Knowledge.countDocuments({
            user: userId
        });

        if (trainingCount >= plan.trainingLimit) {
            throw new Error(
                `Training limit reached (${plan.trainingLimit}).`
            );
        }

        return true;
    }

    // Check monthly AI message limit
    async checkMessageLimit(userId) {

        const plan = await this.getPlan(userId);

        const usage = await Usage.findOne({
            user: userId
        });

        const used = usage?.messagesUsed || 0;

        if (used >= plan.messageLimit) {
            throw new Error(
                "Monthly AI message limit reached."
            );
        }

        return true;
    }

    // Increase message count
    async incrementMessageUsage(userId) {

        await Usage.findOneAndUpdate(
            { user: userId },
            {
                $inc: {
                    messagesUsed: 1
                }
            },
            {
                upsert: true,
                new: true
            }
        );
    }

}

export default new PlanService();