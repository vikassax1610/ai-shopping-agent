import express from "express"
import cors from "cors"
import chatRoute from "./routes/route.chat.js"
const app = express()

const allowedOrigins = [
  "https://ai-shopping-agent-one.vercel.app",
  "http://localhost:5173",
  "https://thread-shopping-store.vercel.app"
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json())
app.use("/api", chatRoute)

export default app