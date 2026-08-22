import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
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

export default generateAIResponse;