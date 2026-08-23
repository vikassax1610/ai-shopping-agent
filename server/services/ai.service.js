import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  });

  return response.text;
};

const understandShoppingQuery = async (message) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are a shopping query parser.

Analyze the user's shopping request and extract product filters.

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.

The JSON must contain exactly these fields:

{
  "category": null,
  "brand": null,
  "color": null,
  "minPrice": null,
  "maxPrice": null
}

Rules:
- If the user doesn't mention a field, use null.
- minPrice and maxPrice must be numbers or null.
- category, brand and color must be strings or null.

Shopping request:
${message}
            `,
          },
        ],
      },
    ],
  });

  const cleanResponse = response.text
    .replace("```json", "")
    .replace("```", "")
    .trim();

  return JSON.parse(cleanResponse);
};

export default {
  generateAIResponse,
  understandShoppingQuery,
};