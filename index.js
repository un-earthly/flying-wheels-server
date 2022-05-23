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
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        console.log(decoded)
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
        app.get('/products', async (req, res) => {
            res.send(await ProductsCollection.find().toArray())
        })

        app.get('/purchase/:id', verifyJWT, async (req, res) => {
            const decodedEmail = req.decoded.email;
            console.log(decodedEmail)

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