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
  Do not add explanations.

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
  - Match singular and plural forms to the available category.
    Example: "dress" or "dresses" → "Dresses".
  - gender must be exactly "Women", "Men", or "Unisex".
  - "women's", "womens", and "for women" → "Women".
  - "men's", "mens", and "for men" → "Men".
  - color should be the color explicitly mentioned by the user.
  - Do not invent colors that are not mentioned.
  - minPrice and maxPrice must be numbers or null.
  - "under ₹X" means maxPrice = X and minPrice = null.
  - "below ₹X" means maxPrice = X and minPrice = null.
  - "up to ₹X" means maxPrice = X and minPrice = null.
  - "above ₹X" means minPrice = X and maxPrice = null.
  - "over ₹X" means minPrice = X and maxPrice = null.
  - "between ₹X and ₹Y" means minPrice = X and maxPrice = Y.
  - Ignore the ₹ symbol when extracting numeric prices.
  - minRating must be a number or null.
  - isNew must be true, false, or null.
  - isBestSeller must be true, false, or null.
  - Use isNew = true for requests such as "new arrivals",
    "new products", or "latest products".
  - Use isBestSeller = true for requests such as "best sellers",
    "bestsellers", or "most popular products".
  - Do not invent product information.
  - Do not infer a filter unless the user's message clearly indicates it.

  Examples:

  User:
  Show me women's dresses under ₹2500

  Output:
  {
    "intent": "product_search",
    "category": "Dresses",
    "gender": "Women",
    "color": null,
    "minPrice": null,
    "maxPrice": 2500,
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
  Show me new women's tops under ₹2000

  Output:
  {
    "intent": "product_search",
    "category": "Tops",
    "gender": "Women",
    "color": null,
    "minPrice": null,
    "maxPrice": 2000,
    "minRating": null,
    "isNew": true,
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

  User:
  Show me women's dresses between ₹1800 and ₹3000

  Output:
  {
    "intent": "product_search",
    "category": "Dresses",
    "gender": "Women",
    "color": null,
    "minPrice": 1800,
    "maxPrice": 3000,
    "minRating": null,
    "isNew": null,
    "isBestSeller": null
  }

  User:
  Hello, how are you?

  Output:
  {
    "intent": "general_chat",
    "category": null,
    "gender": null,
    "color": null,
    "minPrice": null,
    "maxPrice": null,
    "minRating": null,
    "isNew": null,
    "isBestSeller": null
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