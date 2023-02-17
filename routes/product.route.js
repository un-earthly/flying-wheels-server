const router = require('express').Router();


router.get('/products', async (req, res) => {
    res.send(await ProductsCollection.find().toArray())
})
router.post('/product', verifyJWT, async (req, res) => {
    const { name, img, desc, minOrdQty, pricePerUnit, availableQty } = req.body
    const result = await ProductsCollection.insertOne({ name, img, desc, minOrdQty, pricePerUnit, availableQty })
    res.send(result)
})
router.get('/products/:id', verifyJWT, async (req, res) => {
    let items = await ProductsCollection.findOne({ _id: ObjectId(req.params.id) })
    res.send(items)
})
router.delete('/product/:id', verifyJWT, async (req, res) => {
    const result = await ProductsCollection.deleteOne({ _id: ObjectId(req.params.id) })
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

module.exports=router