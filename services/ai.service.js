import ai from "../config/gemini.js";
// import openai from "../config/deepseek.js";

const askAI = async (context, question) => {
    try {
        const prompt = `
                      Context:
                      ${context}
                      Question:
                     ${question}
                     Answer based on the context above.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;

    } catch (error) {
        console.error("Gemini Error:", error);
        return "AI service is busy. Please try again later.";
    }
};


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