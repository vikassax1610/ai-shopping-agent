import express from "express"
import cors from "cors"
import chatRoute from "./routes/route.chat.js"
const app = express()
app.use(cors(
  {
    origin: "https://ai-shopping-agent-one.vercel.app",
  }
));
app.use(express.json())
app.use("/api", chatRoute)

export default app