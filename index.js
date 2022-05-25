const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 80;
const jwt = require('jsonwebtoken');

//stripe
const stripe = require("stripe")(process.env.STRIPE__KEY);

// middle Ware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const req = require('express/lib/request');
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
        const reviewsCollection = client.db("usersDb").collection("review")
        const ordersCollection = client.db("usersDb").collection("order")
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
        app.get('/alluser', async (req, res) => {
            res.send(await usersCollection.find().toArray())
        })
        app.get('/user', verifyJWT, async (req, res) => {
            const email = req.decoded.email
            res.send(await usersCollection.findOne({ email: email }))
        })

        app.put('/updateProfile', verifyJWT, async (req, res) => {
            const email = req.decoded.email
            const { linkedin, education, location, phone, img, name } = req.body

            const options = { upsert: true };
            const updateDoc = {
                $set: { name, email, linkedin, img, phone, location, education }

            };
            res.send(await usersCollection.updateOne({ email }, updateDoc, options))
        })
        app.get('/review', async (req, res) => {
            res.send(await reviewsCollection.find().toArray())
        })
        app.post('/review', verifyJWT, async (req, res) => {
            const email = req.decoded.email
            const { img, name, review, ratings } = req.body
            const options = { upsert: true };
            const updateDoc = {
                $set: { email, review, ratings, img, name }
            };
            res.send(await reviewsCollection.updateOne({ email }, updateDoc, options))
        })
        app.get('/orders', async (req, res) => {
            res.send(await ordersCollection.find().toArray())
        })
        app.patch('/orders', verifyJWT, async (req, res) => {
            const updateDoc = {
                $set: {
                    shippedStatus: true
                }
            }
            res.send(await ordersCollection.updateOne({ _id: ObjectId(req.body) }, updateDoc))
        })
        app.get('/myorders', verifyJWT, async (req, res) => {
            const email = req.decoded.email
            res.send(await ordersCollection.find({ email }).toArray())
        })
        app.delete('/orders/:id', verifyJWT, async (req, res) => {
            res.send(await ordersCollection.deleteOne({ _id: ObjectId(req.params.id) }))

        })
        // products based apis 
        app.get('/products', async (req, res) => {
            res.send(await ProductsCollection.find().toArray())
        })
        app.post('/product', verifyJWT, async (req, res) => {
            const { name, img, desc, minOrdQty, pricePerUnit, availableQty } = req.body
            const result = await ProductsCollection.insertOne({ name, img, desc, minOrdQty, pricePerUnit, availableQty })
            res.send(result)
        })
        app.get('/products/:id', verifyJWT, async (req, res) => {
            let items = await ProductsCollection.findOne({ _id: ObjectId(req.params.id) })
            res.send(items)
        })
        app.delete('/product/:id', verifyJWT, async (req, res) => {
            const result = await ProductsCollection.deleteOne({ _id: ObjectId(req.params.id) })
            res.send(result)
        })

        app.post('/purchase', verifyJWT, async (req, res) => {
            const email = req.decoded.email
            const { id } = req.body
            const existing = await ordersCollection.findOne({ id, email })
            const isAdmin = await usersCollection.findOne({ email })
            isAdmin.admin && res.send({ message: "Admins cant Order" })
            !existing ?
                res.send(await ordersCollection.insertOne(req.body))
                : res.status(302).send({ message: 'already exits' })
        })
        app.patch('/makeadmin', async (req, res) => {
            const id = req.body.id
            const updateDoc = {
                $set: {
                    Admin: true
                }
            }
            const result = await usersCollection.updateOne({ _id: ObjectId(id) }, updateDoc)
            res.send(result)
        })
        // stripe || payment related apis
        app.post("/create-payment-intent", verifyJWT, async (req, res) => {
            const { price } = req.body;
            const payableAmount = price * 100
            const paymentIntent = await stripe.paymentIntents.create({
                amount: payableAmount,
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
            })
            res.send({ clientSecret: paymentIntent.client_secret })
        });


        app.get('/pay/:id', async (req, res) => {
            const payFor = await ordersCollection.findOne({ _id: ObjectId(req.params.id) })
            res.send(payFor)

        })
        app.patch('/pay/:id', verifyJWT, async (req, res) => {
            const id = req.params.id
            const { transactionId, paymentStatus } = req.body
            const updateDoc = {
                $set: { transactionId, paymentStatus }
            };
            res.send(await ordersCollection.updateOne({ _id: ObjectId(id) }, updateDoc))


        })
        app.get('/review/byUser', verifyJWT, async (req, res) => {
            const email = req.decoded.email
            res.send(await reviewsCollection.findOne({ email }))
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