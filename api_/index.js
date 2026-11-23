import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { writeFile } from "node:fs/promises";
import { quizSchema } from "./quizSchema.js";

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateQuiz() {
    const prompt = `
Generate exactly 3 questions about RAG.

Each question must have:
- A question
- Exactly 4 multiple-choice options
- A difficulty level: easy, medium, or hard

Put the correct answers in correct_answers in the same order as the questions.
Return only valid JSON.
`;

    const response = await client.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            temperature: 0.7,
            responseMimeType: "application/json",
            responseSchema: quizSchema,
            systemInstruction:
                "Generate a structured quiz and return the correct answers in correct_answers.",
        },
    });

    const quiz = JSON.parse(response.text);

    await writeFile(
        "quiz.json",
        JSON.stringify(quiz, null, 2),
        "utf8"
    );

    const quizText = quiz.questions
        .map((q, index) => {
            return `Question ${index + 1}: ${q.question}
Options.map: ${q.options.join("\n")} ")}
Difficulty: ${q.difficulty}
Correct Answer: ${quiz.correct_answers[index]}

`;
        })
        .join("\n");

    await writeFile("quiz.txt", quizText, "utf8");

    console.log("Quiz saved to quiz.json and quiz.txt");
}

generateQuiz().catch(console.error);

// difficulty topics xuttai and then prompt and then 