const router = require('express').Router();


router.post('/login', async (req, res) => {
    const secret = process.env.JWT__SECRET
    const token = jwt.sign(req.body, secret)
    res.send({ token })
})

router.put('/user', async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const options = { upsert: true };
    const updateDoc = {
        $set: { email, name }

    };
    await usersCollection.updateOne({ email }, updateDoc, options)
})


router.get('/alluser', async (req, res) => {
    res.send(await usersCollection.find().toArray())
})

router.get('/user', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    res.send(await usersCollection.findOne({ email: email }))
})


router.put('/updateProfile', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    const { linkedin, education, location, phone, img, name } = req.body

    const options = { upsert: true };
    const updateDoc = {
        $set: { name, email, linkedin, img, phone, location, education }

    };
    res.send(await usersCollection.updateOne({ email }, updateDoc, options))
})


router.patch('/makeadmin', async (req, res) => {
    const id = req.body.id
    const updateDoc = {
        $set: {
            Admin: true
        }
    }
    const result = await usersCollection.updateOne({ _id: ObjectId(id) }, updateDoc)
    res.send(result)
})



router.get('/review/byUser', verifyJWT, async (req, res) => {
    const email = req.decoded.email
    res.send(await reviewsCollection.findOne({ email }))
})
module.exports = router