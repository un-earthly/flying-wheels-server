import express from "express"
import cors from "cors"
import router from "./routes";
import { connectToDB } from './db';


const app = express();
const port = process.env.PORT || 80;

app.use(cors())
app.use(express.json())
app.use("api/v1", router)



connectToDB()


app.get('/', (req, res) => {
    res.send('Manufacturer Server is running')
})


app.listen(port, () => console.log("server is running on port " + port))