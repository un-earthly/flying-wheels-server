const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 80;
const { connectToDB } = require('./db');

const OrderRoutes = require("./routes/order.routes")
const PaymentRoutes = require("./routes/payment.route")
const ProductRoutes = require("./routes/product.route")
const AuthRoutes = require("./routes/auth.route")
const ReviewRoutes = require("./routes/review.route")
const UserRoutes = require("./routes/user.route")

app.use(cors())
app.use(express.json())


const apiVersion = "/api/v1"


connectToDB()

app.use(`${apiVersion}/order`, OrderRoutes)
app.use(`${apiVersion}/auth`, AuthRoutes)
app.use(`${apiVersion}/payment`, PaymentRoutes)
app.use(`${apiVersion}/product`, ProductRoutes)
app.use(`${apiVersion}/review`, ReviewRoutes)
app.use(`${apiVersion}/user`, UserRoutes)



app.get('/', (req, res) => {
    res.send('Manufacturer Server is running')
})


app.listen(port, () => console.log("server is running on port " + port))