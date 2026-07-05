import mongoose from "mongoose";
import Plan from "../models/plan.js";
import dotenv from "dotenv"
dotenv.config();

const plans = [
    {
        name: "free",
        price: 0,
        chatbotLimit: 1,
        trainingLimit: 5,
        messageLimit: 100,
    },
    {
        name: "pro",
        price: 499,
        chatbotLimit: 5,
        trainingLimit: 50,
        messageLimit: 10000,
    },
    {
        name: "business",
        price: 1499,
        chatbotLimit: 50,
        trainingLimit: 500,
        messageLimit: 100000,
    },
];

const seedPlans = async () => {
    await Plan.deleteMany();
    await Plan.insertMany(plans);

    console.log("Plans seeded")

    process.exit();


}


mongoose.connect(process.env.MONGO_URI).then(seedPlans);

