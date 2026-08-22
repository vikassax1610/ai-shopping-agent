import express from "express"
import generateAIResponse from "../services/ai.service.js"
const chatRoute = express.Router()

chatRoute.post("/chat", async (req, res) => {
  const { message } = req.body
  try {
    const aiResponse = await generateAIResponse(message)
    res.status(200).json({ message: aiResponse })
  } catch (error) {
    console.error("AI Error:", error)
    res.status(500).json({ message: "Error generating AI response" })
  }
})


export default chatRoute