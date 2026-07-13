import Knowledge from "../models/knowledge.js";

const createEmbeddings = async (chatbotId, knowledgeId, content) => {
    const chunks = [];

    const chunkSize = 1000;

    for (let i = 0; i < content.length; i += chunkSize) {
        chunks.push(content.slice(i, i + chunkSize));
    }

    await Knowledge.findByIdAndUpdate(
        knowledgeId,
        {
            chunks,
        }
    );

    return chunks;
};

export default createEmbeddings;