import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIResponse = async (prompt, products) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
              You are a concise and helpful AI shopping assistant.

              Rules:
              - Keep responses short and conversational.
              - Do not write long articles unless the user explicitly asks for details.
              - Never invent product names, prices, discounts, stock, retailers, URLs, specifications, or availability.
              - Never recommend products that were not provided by the application.
              - Do not mention Amazon, Flipkart, Myntra, Ajio, or other retailers unless explicitly provided.
              - Product information provided below comes from the application and is the only source of truth for products.
              - If products are provided, you may mention them, but only use information contained in the provided product data.
              - If no products are provided, do not invent or recommend specific products.
              - When the user asks to find products, briefly acknowledge their request.
              - Do not create a list of products yourself.
              - Do not claim that a product exists unless it is provided by the application.

              User message:
              ${prompt}
              Products found by the application:
              ${JSON.stringify(products)}
              `,
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
              You are the intent and product filter extractor for an AI shopping assistant.

              Analyze the user's message.

              Determine whether the user:
              1. wants to search/find/recommend products
              2. is having a general conversation or asking a non-shopping question
              Return ONLY valid JSON.
              Do not use markdown.
              Do not use code fences.

              The JSON must contain exactly these fields:

              {
                "intent": "product_search" | "general_chat",
                "category": null,
                "brand": null,
                "color": null,
                "minPrice": null,
                "maxPrice": null
              }

              Rules:
              - Use "product_search" when the user is asking to find, search,
                recommend, compare, or suggest products.
              - Use "general_chat" for questions, greetings, explanations,
                or conversations that do not require searching the product catalog.
              - If intent is "general_chat", all product filters must be null.
              - If a product filter is not mentioned, return null.
              - minPrice and maxPrice must be numbers or null.

              User message:
              ${message}
              `
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