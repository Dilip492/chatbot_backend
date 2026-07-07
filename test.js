// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";

// dotenv.config();

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// async function main() {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "hii",
//     });

//     console.log(response.text);
// }

// main();



import OpenAI from "openai";
 import dotenv from "dotenv";

dotenv.config();
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: "hello i am check it is working ",
});
console.log(response.output_text);
