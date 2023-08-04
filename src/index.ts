import express from "express"
import cors from "cors"
import router from "../../routes";
import { commonConf } from '../../config/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 80;

app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use("/api/v1", router)

const uri: string = `mongodb+srv://${commonConf.db_user}:${commonConf.db_pass}@cluster0.vcjhy.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri).then(res => console.log("connection established")).catch(err => console.log("connection error"))


app.get('/', (req, res) => {
    res.send('Manufacturer Server is running')
})


app.listen(port, () => console.log("server is running on port " + port))