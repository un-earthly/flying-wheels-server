const router = require('express').Router();


router.get('/orders', async (req, res) => {
    res.send(await ordersCollection.find().toArray())
})

router.patch('/orders', verifyJWT, async (req, res) => {
    const updateDoc = {
        $set: {
            shippedStatus: true
        }
    }
    res.send(await ordersCollection.updateOne({ _id: ObjectId(req.body) }, updateDoc))
})

router.get('/myorders', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    res.send(await ordersCollection.find({ email }).toArray())
})



router.delete('/orders/:id', verifyJWT, async (req, res) => {
    res.send(await ordersCollection.deleteOne({ _id: ObjectId(req.params.id) }))

})



module.exports = router