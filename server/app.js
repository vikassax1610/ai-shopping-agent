import express from "express"
import chatRoute from "./routes/route.chat.js"
const app = express()
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use("/api", chatRoute)

export default app