import { MongoClient, Collection } from 'mongodb';
import { commonConf } from './config/config';

const uri: string = `mongodb+srv://${commonConf.db_user}:${commonConf.db_pass}@cluster0.vcjhy.mongodb.net/?retryWrites=true&w=majority`;
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
