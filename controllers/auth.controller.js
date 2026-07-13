import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv"
import { createNotification } from "../services/notification.service.js";
dotenv.config();


const isProduction = process.env.NODE_ENV === "production";

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // createNotification
        await createNotification({
            user: user._id,
            type: "info",
            title: "Welcome 👋",
            message: "Create your first chatbot.",
            actionUrl: "/chatbots",
        });


        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            token: token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (
            !user ||
            !(await bcrypt.compare(password, user.password))
        ) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            success: true,
            token: token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const profile = async (req, res) => {
    res.json(req.user);
};



export const googleCallback = async (req, res) => {
    try {
        const token = generateToken(req.user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.redirect(
            `${process.env.CLIENT_URL}/dashboard?googleLogin=true`
        );
    } catch (error) {
        console.error(error);

        res.redirect(
            `${process.env.CLIENT_URL}/login?error=server_error`
        );
    }
};


export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, // true in production with HTTPS
        sameSite: "none",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};