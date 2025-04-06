import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
    model: 'gemini-2.0-flash-thinking-exp-01-21'
});

const aiService = {
    prompt: async (question) => {
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

    longContext: async (prompt, pdfPath) => {
        const instructions = `Res in ptBr, use formal language 
        Instructions: Query:${prompt} Language Response: PT-BR
        Document: [Full document text provided]`;

        try {
            // Verifique se o arquivo existe
            if (!fs.existsSync(pdfPath)) {
                throw new Error(`Arquivo não encontrado: ${pdfPath}`);
            }

            const pdfBuffer = fs.readFileSync(pdfPath);
            if (pdfBuffer.length === 0) {
                throw new Error('O arquivo PDF está vazio.');
            }

            const pdfBase64 = pdfBuffer.toString('base64');
            const p = {
                "contents": [
                    {
                        "parts": [
                            { "text": instructions },
                            { "inline_data": { "mime_type": "application/pdf", "data": pdfBase64 } }
                        ]
                    }
                ]
            };

            try {
                const result = await model.generateContent(p, { timeout: 60000 });
                return result.response;
            } catch (error) {
                console.error('Erro ao processar o contexto longo:', error);
                if (error.status === 500) {
                    throw new Error('Erro interno no servidor da API do Google Generative AI. Tente novamente mais tarde.');
                }
                throw error;
            }
        } catch (error) {
            console.error('Erro ao processar o contexto longo:', error);
            throw error;
        }
    },

    sinthetizePrompt: () => {
        // Implementação futura
    }
};

export default aiService;