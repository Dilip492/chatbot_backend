
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();


const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});


export default openai;
// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "deepseek-v4-pro",
//     thinking: {"type": "enabled"},
//     reasoning_effort: "high",
//     stream: false,
//   });

//   console.log(completion.choices[0].message.content);
// }

// main();