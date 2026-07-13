import Knowledge from "../models/knowledge.js";

const vectorSearch = async (chatbotId, question) => {
    const docs = await Knowledge.find({
        chatbotId,
    });

    let context = "";

    docs.forEach((doc) => {
        context += doc.content + "\n";
    });

    return context.substring(0, 10000);
};

export default vectorSearch;