import express from "express"
import morgan from "morgan"
const PORT = 3000

const app = express()

app.use(morgan("dev"))

app.get("/", (req,res) => {
  res.send("hello world")
})


app.listen(PORT, () => {
  console.log("Server is running")
  
})