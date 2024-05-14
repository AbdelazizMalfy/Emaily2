const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
require("./models/User")
require("./services/passport")
const authRoutes = require("./routes/authRoutes")
const session = require("express-session")
const passport = require("./services/passport")

const PORT = process.env.PORT || 5001

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
)

app.use(passport.initialize())
app.use(passport.session())

authRoutes(app)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection successful"))

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`)
})
