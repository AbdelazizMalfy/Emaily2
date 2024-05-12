const express = require("express")
const app = express()
const PORT = process.env.PORT || 5001

app.get("/", (req, res) => {
  res.send({ hi: "there" })
})

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`)
})
