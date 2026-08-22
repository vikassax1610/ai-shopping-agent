import "dotenv/config";
import generateAIResponse from "./services/ai.service.js";

const testAI = async () => {
  try {
    const response = await generateAIResponse(
      "Explain what an AI shopping assistant is in one simple sentence."
    );

    console.log("AI Response:", response);
  } catch (error) {
    console.error("AI Error:", error);
  }
};

testAI();