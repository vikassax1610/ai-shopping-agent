import express from "express"
const chatRoute = express.Router()

chatRoute.post("/chat", (req, res) => {
  const { message } = req.body
  console.log(message)
  res.status(200).json({ message: "Hello user" })
})

export default chatRoute