const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const mongoose = require("mongoose")

const User = mongoose.model("users")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null))
})

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
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
      } catch (err) {
        console.error("Error during GoogleStrategy callback:", err)
        done(err, null)
      }
    }
  )
)
