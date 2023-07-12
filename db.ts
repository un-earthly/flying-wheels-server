import { MongoClient, Collection, ServerApiVersion } from 'mongodb';
import { commonConf } from './config/config';

const uri: string = commonConf.node_env === "development" ? 'mongodb://localhost:27017' : `mongodb+srv://${process.env.MONGO__ADMIN}:${process.env.MONGO__PASS}@cluster0.vcjhy.mongodb.net/?retryWrites=true&w=majority`;
const client: MongoClient = new MongoClient(uri);

const getDb = (dbName: string, collectionName: string): Collection => {
    return client.db(dbName).collection(collectionName);
};

let productsCollection: Collection;
let usersCollection: Collection;
let reviewsCollection: Collection;
let ordersCollection: Collection;

async function connectToDB(): Promise<void> {
    try {
        await client.connect();
        console.log("Successfully connected to the database");

        productsCollection = getDb("fwdb", "product");
        usersCollection = getDb("fwdb", "user");
        reviewsCollection = getDb("fwdb", "review");
        ordersCollection = getDb("fwdb", "order");

    } catch (err) {
        console.log("Error connecting to the database:", err);
    }
}

export { connectToDB, productsCollection, usersCollection, reviewsCollection, ordersCollection };
