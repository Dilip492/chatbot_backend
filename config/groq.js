import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});


// const genAI = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// }
// );



export default genAI;