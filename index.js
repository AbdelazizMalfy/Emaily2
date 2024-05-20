const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")

require("./models/User")
require("./services/passport")

const passport = require("./services/passport")

const authRoutes = require("./routes/authRoutes")
const paymentRoutes = require("./routes/paymentRoutes")

const PORT = process.env.PORT || 5001

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection successful"))

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(bodyParser.json())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      httpOnly: false,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

authRoutes(app)
paymentRoutes(app)

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`)
})
