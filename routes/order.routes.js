const router = require('express').Router();
const { ObjectId } = require('mongodb');
const { ordersCollection } = require('../db');
const verifyJWT = require('../middleweres/verifyJWT')

router.get('/list', async (req, res) => {
    res.send(await ordersCollection.find().toArray())
})

router.patch('/:id', verifyJWT, async (req, res) => {
    const updateDoc = {
        $set: {
            shippedStatus: true
        }
    }
    res.send(await ordersCollection.updateOne({ _id: ObjectId(req.params.id) }, updateDoc))
})

router.get('/by-email', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    res.send(await ordersCollection.find({ email }).toArray())
})



router.delete('/:id', verifyJWT, async (req, res) => {
    res.send(await ordersCollection.deleteOne({ _id: ObjectId(req.params.id) }))

})



module.exports = router