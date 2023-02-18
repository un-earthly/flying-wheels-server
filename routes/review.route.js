const router = require('express').Router()
const { reviewsCollection } = require('../db')
const verifyJWT = require('../middleweres/verifyJWT')


router.get('/list', async (req, res) => {
    res.send(await reviewsCollection.find().toArray())
})


router.post('/add', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    const { img, name, review, ratings } = req.body
    const options = { upsert: true };
    const updateDoc = {
        $set: { email, review, ratings, img, name }
    };
    res.send(await reviewsCollection.updateOne({ email }, updateDoc, options))
})


module.exports = router