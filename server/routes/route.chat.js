import express from "express";
import aiService from "../services/ai.service.js";
import searchProducts from "../services/product.service.js";

const chatRoute = express.Router();

chatRoute.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    if (!message?.trim()) {
      return res.status(400).json({
        message: "Message is required",
        products: [],
      });
    }

    const filters = await aiService.understandShoppingQuery(message);

    const products = searchProducts(filters);

    const aiResponse = await aiService.generateAIResponse(message);

    return res.status(200).json({
      message: aiResponse,
      products,
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      
      message: "Error generating AI response",
      products: [],
    });
  }
});

export default chatRoute;