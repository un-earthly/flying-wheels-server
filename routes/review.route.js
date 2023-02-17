const router = require('express').Router()


router.get('/review', async (req, res) => {
    res.send(await reviewsCollection.find().toArray())
})


router.post('/review', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    const { img, name, review, ratings } = req.body
    const options = { upsert: true };
    const updateDoc = {
        $set: { email, review, ratings, img, name }
    };
    res.send(await reviewsCollection.updateOne({ email }, updateDoc, options))
})


module.exports = router