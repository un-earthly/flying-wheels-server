const router = require('express').Router();
const verifyJWT = require('../middleweres/verifyJWT')
const jwt = require('jsonwebtoken');
const { usersCollection } = require('../db');


router.post('/login', async (req, res) => {
    const secret = process.env.JWT__SECRET
    const token = jwt.sign(req.body, secret)
    res.send({ token })
})

router.put('/update-user', async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            email,
            name
        }
    };
    await usersCollection.updateOne({ email }, updateDoc, options)
})

router.patch('/makeadmin', async (req, res) => {
    const id = req.body.id
    const updateDoc = {
        $set: {
            Admin: true
        }
    }
    const result = await usersCollection.updateOne(
        { _id: ObjectId(id) },
        updateDoc)
    res.send(result)
})


module.exports = router