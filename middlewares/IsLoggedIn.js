module.exports = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.status(401).send({ error: "You must log in!" })
}
