import dotenv from "dotenv/config"
import app from "./app.js"
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.json({
    message: "AI Shopping Assistant API is running",
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})