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
              You are a helpful AI shopping assistant for an ecommerce store.

              Rules:
              - Keep responses concise and conversational.
              - Never invent products, prices, discounts, ratings, stock, or other product information.
              - The products provided below are the only source of truth for product information.
              - If products are provided, only mention information that exists in those products.
              - If no products are provided, do not recommend specific products.
              - Do not create your own product list because product cards are displayed separately by the application.
              - Do not mention external websites or retailers unless they are explicitly provided.
              
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
              You are the intent and product filter extractor for an ecommerce store.

              Analyze the user's message and determine whether they want to search for
              products or are having a general conversation.

              Return ONLY valid JSON.
              Do not use markdown.
              Do not use code fences.

              The JSON must contain exactly these fields:

              {
                "intent": "product_search" | "general_chat",
                "category": null,
                "gender": null,
                "color": null,
                "minPrice": null,
                "maxPrice": null,
                "minRating": null,
                "isNew": null,
                "isBestSeller": null
              }

              Available product categories:
              T-Shirts, Jackets, Trousers, Dresses, Hoodies, Shirts,
              Bags, Watches, Sunglasses, Caps, Tops, Jeans,
              Skirts, Accessories, Jewelry

              Available genders:
              Women, Men, Unisex

              Rules:
              - Use "product_search" when the user wants to find, search,
                recommend, suggest, or compare products.
              - Use "general_chat" for greetings, general questions,
                explanations, or conversations that do not require product search.
              - If intent is "general_chat", all product filters must be null.
              - If a filter is not mentioned, return null.
              - category must correspond to an available product category.
              - gender must be Women, Men, or Unisex.
              - color should be the color mentioned by the user.
              - minPrice and maxPrice must be numbers or null.
              - minRating must be a number or null.
              - isNew and isBestSeller must be true, false, or null.
              - Do not invent product information.

              Examples:

              User:
              Show me women's dresses under 2000

              Output:
              {
                "intent": "product_search",
                "category": "Dresses",
                "gender": "Women",
                "color": null,
                "minPrice": null,
                "maxPrice": 2000,
                "minRating": null,
                "isNew": null,
                "isBestSeller": null
              }

              User:
              Show me black jackets

              Output:
              {
                "intent": "product_search",
                "category": "Jackets",
                "gender": null,
                "color": "Black",
                "minPrice": null,
                "maxPrice": null,
                "minRating": null,
                "isNew": null,
                "isBestSeller": null
              }

              User:
              What are your best sellers?

              Output:
              {
                "intent": "product_search",
                "category": null,
                "gender": null,
                "color": null,
                "minPrice": null,
                "maxPrice": null,
                "minRating": null,
                "isNew": null,
                "isBestSeller": true
              }

              User message:
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