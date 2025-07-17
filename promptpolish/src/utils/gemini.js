import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function refinePrompt(userPrompt, tone = "creative") {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const promptTemplate = `
You are an expert AI prompt engineer. Improve the following prompt with the tone "${tone}" and make it more effective for GPT or Claude.

Original Prompt:
"""${userPrompt}"""

Refined Prompt:
`;

  const result = await model.generateContent(promptTemplate);
  const response = await result.response;
  return response.text().trim();
}
