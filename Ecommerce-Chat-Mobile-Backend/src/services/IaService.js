import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({
    model: 'gemini-2.0-flash-thinking-exp-01-21'
});

const aiService = {
    prompt: async (question) => {
        FileSystem.readySyncFile('../training/CV.pdf')
        const p = {
            "contents": [
                {
                    "parts": [
                        { "text": question }
                    ]
                }
            ]
        };

        try {
            const result = await model.generateContent(p, { timeout: 60000 });
            return result.response;
        } catch (error) {
            console.error('Erro ao gerar conteúdo:', error);
            throw error;
        }
    },
    analysePrompt: () => {
        // Implementação futura
    },
    sinthetizePrompt: () => {
        // Implementação futura
    }
};

export default aiService;