const router = require('express').Router();
const { ObjectId } = require('mongodb');
const { productsCollection, ordersCollection, usersCollection } = require('../db');
const verifyJWT = require('../middleweres/verifyJWT')


router.get('/list', async (req, res) => {
    res.send(await productsCollection.find().toArray())
})
router.post('/add', verifyJWT, async (req, res) => {
    const { name, img, desc, minOrdQty, pricePerUnit, availableQty } = req.body
    const result = await productsCollection.insertOne({ name, img, desc, minOrdQty, pricePerUnit, availableQty })
    res.send(result)
})
router.get('/:id', verifyJWT, async (req, res) => {
    let items = await productsCollection.findOne({ _id: ObjectId(req.params.id) })
    res.send(items)
})
router.delete('/product/:id', verifyJWT, async (req, res) => {
    const result = await productsCollection.deleteOne({ _id: ObjectId(req.params.id) })
    res.send(result)
})

router.post('/purchase', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    const { id } = req.body
    const existing = await ordersCollection.findOne({ id, email })
    const isAdmin = await usersCollection.findOne({ email })
    isAdmin.admin && res.send({ message: "Admins cant Order" })
    !existing ?
        res.send(await ordersCollection.insertOne(req.body))
        : res.status(302).send({ message: 'already exits' })
})

module.exports = router