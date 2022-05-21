const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 80;
const jwt = require('jsonwebtoken');
// middle Ware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MOGO__ADMIN}:${process.env.MONGO__PASS}@cluster0.vcjhy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        client.connect()
    } finally {

    }
}

run()
// serving / api
app.get('/', (req, res) => {
    res.send('Manufacturer Server is running')
})


app.listen(port)