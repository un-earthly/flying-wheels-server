const router = require('express').Router();


router.post("/create-payment-intent", verifyJWT, async (req, res) => {
    const { price } = req.body;
    const payableAmount = price * 100
    const paymentIntent = await stripe.paymentIntents.create({
        amount: payableAmount,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    })
    res.send({ clientSecret: paymentIntent.client_secret })
});


router.patch('/pay/:id', verifyJWT, async (req, res) => {
    const id = req.params.id
    const { transactionId, paymentStatus } = req.body
    const updateDoc = {
        $set: { transactionId, paymentStatus }
    };
    res.send(await ordersCollection.updateOne({ _id: ObjectId(id) }, updateDoc))


})
router.get('/pay/:id', async (req, res) => {
    const payFor = await ordersCollection.findOne({ _id: ObjectId(req.params.id) })
    res.send(payFor)

})


module.exports=router