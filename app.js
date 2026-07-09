import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from "./routes/auth.routes.js"
import chatbotRoutes from "./routes/chatbot.routes.js"
import trainRoutes from "./routes/train.routes.js"
import widgetRoutes from "./routes/widget.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import conversationRoutes from "./routes/conversations.routes.js"
import planRoutes from "./routes/plan.routes.js"
import orderRoutes from "./routes/order.routes.js"
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import passport from "passport"
import "./config/passport.js"
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();


// console.log(process.env.SERVER_URL)

const app = express();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;


// Routes
app.use("/api/auth", userRoutes);
app.use("/api/chatbots", chatbotRoutes);
app.use("/api/train", trainRoutes);
app.use("/api/widget", widgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/conversations", conversationRoutes)
app.use("/api", planRoutes)
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Chatbot API Running 🚀",
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});