const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const isLoggedIn = require("../middlewares/IsLoggedIn")

module.exports = (app) => {
  app.post(
    "/api/payment/create-payment-intent",
    isLoggedIn,
    async (req, res) => {
      const { amount } = req.body

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
        })

        req.user.credit += 5
        await req.user.save()

        res.send({ clientSecret: paymentIntent.client_secret })
      } catch (error) {
        res.status(400).send({ error: error.message })
      }
    }
  )
}
