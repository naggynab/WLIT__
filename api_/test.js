import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import fs from "node:fs";

const ai= new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const image_path= "C:/Users/080bc/Documents/javascript_learning/api_/images/cat.jpg";
const imageData= fs.readFileSync(image_path).toString("base64");
//never give images and test at once as in something :$(imageData) because it will be too long and will not work. Instead, use inlineData as below.
const prompts= [
  {text : "Describe the image in detail."},
  {inlineData: {
    mimeType: "image/jpg",
    data: imageData,
  }},
]

async function main(){
  const response= await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
        // contents: `Describe the image in detail. Image data: ${imageData}`,
    contents: prompts,
  });
  console.log(response.text);
}

main();

// console.log("Image data:", imageData);