const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 80;
const jwt = require('jsonwebtoken');
// middle Ware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MOGO__ADMIN}:${process.env.MONGO__PASS}@cluster0.vcjhy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Un Authorized User' })
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT__SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    })
}
const run = async () => {
    try {
        client.connect()
        const ProductsCollection = client.db("productsDB").collection("product")
        const usersCollection = client.db("usersDb").collection("user")
        app.post('/login', async (req, res) => {
            const secret = process.env.JWT__SECRET
            const token = jwt.sign(req.body, secret)
            res.send({ token })
        })
        // putting user email name inside db 
        app.put('/user', async (req, res) => {
            const email = req.body.email
            const name = req.body.name
            const options = { upsert: true };
            const updateDoc = {
                $set: { email, name }

            };
            await usersCollection.updateOne({ email }, updateDoc, options)
        })
        app.get('/user', verifyJWT, async (req, res) => {
            const email = req.decoded.email
            res.send(await usersCollection.findOne({ email: email[0] }))
        })

        app.put('/updateProfile', verifyJWT, async (req, res) => {
            const email = req.decoded.email[0]
            const { linkedin, education, location, phone, img } = req.body

            const options = { upsert: true };
            const updateDoc = {
                $set: { linkedin, img, phone, location, education }

            };
            res.send(await usersCollection.updateOne({ email }, updateDoc, options))
            // console.log(email)
        })
        app.get('/products', async (req, res) => {
            res.send(await ProductsCollection.find().toArray())
        })
        app.get('/products/:id', verifyJWT, async (req, res) => {
            let items = await ProductsCollection.findOne({ _id: ObjectId(req.params.id) })
            res.send(items)
        })
    } finally {

    }
}

run()
// serving / api
app.get('/', (req, res) => {
    res.send('Manufacturer Server is running')
})


app.listen(port)