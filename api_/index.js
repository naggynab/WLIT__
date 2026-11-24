import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import fs from "node:fs";
import { quizSchema } from "./quizSchema.js";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



const configuration = {
  temperature: 0.7,
  responseMimeType: "application/json",
  responseSchema: quizSchema,
  systemInstruction:
    "Generate a structured quiz in JSON format based on the contents of the image. The quiz should contain exactly 3 questions, each with 4 options and a difficulty level (easy, medium, or hard). Also provide the correct answers for each question but at the last of end of all the questions.",
};

const image_path= "C:/Users/080bc/Documents/javascript_learning/api_/images/cat.jpg";
const imageData= fs.readFileSync(image_path).toString("base64");

const prompt = [
  {text : "Generate exactly 3 questions based on the contents in the image."},
  {inlineData: {
    mimeType: "image/jpeg",
    data: imageData,
  }},
]

const follow_up = ["what color is it?"];

async function generateQuiz() {
    const history=[];
    history.push({role: "user", parts: prompt});

    const response = await client.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: history,
        config: configuration,
    });

    const quiz = JSON.parse(response.text);
    console.log("Response 1:", quiz);
    history.push({role: "assistant", parts: [{text: response.text}]});

    for (const followUp of follow_up) {
        history.push({role: "user", parts: [{text: followUp}]});
    
        const response2= await client.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: history,
        });
        console.log("Response 2:", response2.text);
        history.push({role: "assistant", parts: [{text: response2.text}]});
    }
    console.log("Final History:", history);

  await fs.promises.writeFile(
    "quiz.json",
    JSON.stringify(quiz, null, 2),
    "utf8"
  );

  let quizText = "";

  for (let index = 0; index < quiz.questions.length; index++) {
    const question = quiz.questions[index];

    quizText += `Question ${index + 1}: ${question.question}\n\n`;
    quizText += "Options:\n";

    for (
      let optionIndex = 0;
      optionIndex < question.options.length;
      optionIndex++
    ) {
      const letter = String.fromCharCode(97 + optionIndex);

      quizText += `${letter}. ${question.options[optionIndex]}\n`;
    }

    quizText += `\nDifficulty: ${question.difficulty}\n`;
    quizText += `Correct Answer: ${quiz.correct_answers[index]}\n\n`;
  }

  await fs.promises.writeFile("quiz.txt", quizText, "utf8");

  console.log("Quiz generated successfully.");
  console.log("Created files: quiz.json and quiz.txt");
}

try {
  await generateQuiz();
} catch (error) {
  console.error("Something went wrong:", error);
}

// homework:history tracking in quiz generation, make it easier and harder for followup questions
