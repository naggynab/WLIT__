import { Type } from "@google/genai";
// const difficulty=["easy", "medium", "hard"];
export const quizSchema = {
    type: Type.OBJECT,
    properties: {
        questions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                    },
                    options: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING,
                        },
                    },
                    difficulty: {
                        type: Type.STRING,
                        enum: ["easy", "medium", "hard"],
                    },
                },
                required: ["question", "options", "difficulty"],
            },
        },

        correct_answers: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
        },
    },

    required: ["questions", "correct_answers"],
    propertyOrdering: ["questions", "correct_answers"],
};