const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const mongoose = require("mongoose")

const User = mongoose.model("users")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
  const user = await User.findById(userId)
  done(null, user)
})

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (!existingUser) {
        console.log("Creating new user...")
        const user = await new User({ googleId: profile.id }).save()
        console.log("New user created!")
        done(null, user)
      } else {
        console.log("user already exist")
        done(null, existingUser)
      }
    }
  )
)
