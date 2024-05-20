const passport = require("passport")

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  )

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3000")
    }
  )

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      return res.send({ message: "You have been logged out." })
    })
  })

  app.get("/api/current-user", (req, res) => {
    req.user ? res.send(req.user) : res.send(null)
  })
}
