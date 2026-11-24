import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { writeFile } from "node:fs/promises";
import { quizSchema } from "./quizSchema";

const client = new GoogleGenAI ({
    api: process.env.GEMINI_API_KEY,
});

async function generateQuiz(){
    const prompt = `
    Give me 3 quiz questions with 4 options each
    and the options must be short and 
    the quiz quesitons must be about RAG.
    `

    const response = await client.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config:{
            temperature: 1.5,
            responseMimeType: "application/json",
            responseSchema: quizSchema,
            systemInstruction:
                `
                generate a structured quiz and return the correct answers at the very end of end of all the questions`


        }
    });
    
}
