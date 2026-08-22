import express from "express"
import cors from "cors"
import chatRoute from "./routes/route.chat.js"
const app = express()
app.use(cors());
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use("/api", chatRoute)

export default app