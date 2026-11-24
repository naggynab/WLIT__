// import { GoogleGenAI } from "@google/genai";
// import "dotenv/config";
// import { readFile, writeFile } from "node:fs/promises";
// import path from "node:path";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const historyFile = "chat-history.json";

// async function loadHistory() {
//   try {
//     return JSON.parse(await readFile(historyFile, "utf8"));
//   } catch {
//     return [];
//   }
// }

// function getMimeType(filePath) {
//   const ext = path.extname(filePath).toLowerCase();

//   const types = {
//     ".jpg": "image/jpeg",
//     ".jpeg": "image/jpeg",
//     ".png": "image/png",
//     ".webp": "image/webp",
//     ".gif": "image/gif",
//   };

//   if (!types[ext]) {
//     throw new Error("Unsupported image type");
//   }

//   return types[ext];
// }

// const previousHistory = await loadHistory();

// const chat = ai.chats.create({
//   model: "gemini-3.1-flash-lite",
//   history: previousHistory,
//   config: {
//     systemInstruction:
//       "You are a helpful assistant. Remember the previous conversation.",
//       temperature: ,
//   },
// });

// async function askGemini(question, imagePath) {
//   const message = [
//     {
//       text: question,
//     },
//   ];

//   if (imagePath) {
//     message.push({
//       inlineData: {
//         mimeType: getMimeType(imagePath),
//         data: await readFile(imagePath, "base64"),
//       },
//     });
//   }

//   const response = await chat.sendMessage({
//     message,
//   });

//   console.log("\nGemini:", response.text);

//   // Remember conversation after this response
//   await writeFile(
//     historyFile,
//     JSON.stringify(chat.getHistory(true), null, 2)
//   );
// }

// const question = process.argv[2] || "Describe this image.";
// const imagePath = process.argv[3];

// await askGemini(question, imagePath);