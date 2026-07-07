// import ai from "../config/gemini.js";
// import openai from "../config/deepseek.js";
import groqai from "../config/groq.js"

const askAI = async (context, question) => {
    try {
        const prompt = `
You are a website support chatbot.

Rules:
1. Answer ONLY using the information found in the context.
2. Do NOT use outside knowledge.
3. Do NOT say phrases like:
   - "Based on the context provided"
   - "According to the context"
   - "The context states"
4. Answer naturally as a customer support assistant.
5. If the information is not available in the context, reply:
   "I couldn't find that information on the website."
6. Use bullet points for lists.
7. Keep answers concise and professional.

Context:
${context}

User Question:
${question}
`;

        // const response = await ai.models.generateContent({
        //     model: "gemini-2.5-flash",
        //     contents: prompt,
        // });

        const response = await groqai.responses.create({
            model: "openai/gpt-oss-20b",
            input: prompt,
        });

        return response.output_text;

    } catch (error) {
        console.error("Gemini Error:", error);
        return "AI service is busy. Please try again later.";
    }
};




// gemini setup 
// const askAI = async (context, question) => {
//     try {
//         const prompt = `
// You are a website support chatbot.

// Rules:
// 1. Answer ONLY using the information found in the context.
// 2. Do NOT use outside knowledge.
// 3. Do NOT say phrases like:
//    - "Based on the context provided"
//    - "According to the context"
//    - "The context states"
// 4. Answer naturally as a customer support assistant.
// 5. If the information is not available in the context, reply:
//    "I couldn't find that information on the website."
// 6. Use bullet points for lists.
// 7. Keep answers concise and professional.

// Context:
// ${context}

// User Question:
// ${question}
// `;

//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: prompt,
//         });

//         return response.text;

//     } catch (error) {
//         console.error("Gemini Error:", error);
//         return "AI service is busy. Please try again later.";
//     }
// };


// const askAI = async (context, question) => {
//     try {
//         const completion = await openai.chat.completions.create({
//             model: "deepseek-v4-pro",
//             messages: [
//                 {
//                     role: "system",
//                     content: `
//                           You are a helpful AI chatbot.
//                           Answer ONLY from the provided context.
//                        Context:
//                          ${context}
//                          `,
//                 },
//                 {
//                     role: "user",
//                     content: question,
//                 },
//             ],
//             temperature: 0.3,
//             max_tokens: 1000,
//         });

//         return completion.choices[0].message.content;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };


// import client from "../config/openai.js";

// const askAI = async (context, question) => {
//     const response = await client.responses.create({
//         model: "gpt-5.5",
//         input: `
// Context:
// ${context}

// Question:
// ${question}

// Answer only from the context.
// `,
//     });

//     return response.output_text;
// };


export default askAI;