const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 80;
const jwt = require('jsonwebtoken');
const { connectToDB } = require('./db');

const stripe = require("stripe")(process.env.STRIPE__KEY);

app.use(cors())
app.use(express.json())



connectToDB()


app.get('/', (req, res) => {
    res.send('Manufacturer Server is running')
})


app.listen(port, () => console.log("server is running on port " + port))