import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv"
dotenv.config();

const auth = async (req, res, next) => {
    try {
        // const token = req.header("Authorization")?.replace("Bearer", "");

        const token = req.cookies?.token;


        if (!token) {
            return res.status(401).json({
                message: "Access denied",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // req.user = await User.findById(decoded.id).select("-password");

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();



    } catch (error) {

        console.log("Auth Error:", error.message);

        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

export default auth;