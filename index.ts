import express from "express"
import cors from "cors"
require('dotenv').config();
const app = express();
const port = process.env.PORT || 80;
import { connectToDB } from './db';

import OrderRoutes from "./routes/order.routes";
import PaymentRoutes from "./routes/payment.route";
import ProductRoutes from "./routes/product.route";
import AuthRoutes from "./routes/auth.route";
import ReviewRoutes from "./routes/review.route";
import UserRoutes from "./routes/user.route";

app.use(cors())
app.use(express.json())


const apiVersion = "/api/v1"


connectToDB()

const routes = [
    {
        path: "order",
        route: OrderRoutes
    },
    {
        path: "auth",
        route: AuthRoutes
    },
    {
        path: "payment",
        route: PaymentRoutes
    },
    {
        path: "product",
        route: ProductRoutes
    },
    {
        path: "review",
        route: ReviewRoutes
    },
    {
        path: "user",
        route: UserRoutes
    }
];

routes.forEach(route => app.use(`${apiVersion}/${route.path}`, route.route));



app.get('/', (req, res) => {
    res.send('Manufacturer Server is running')
})


app.listen(port, () => console.log("server is running on port " + port))