
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO__ADMIN}:${process.env.MONGO__PASS}@cluster0.vcjhy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const getDb = (dbName, collectionName) => {
    return client.db(dbName).collection(collectionName)
}
const productsCollection = getDb("productsDB", "product")
const usersCollection = getDb("usersDb", "user")
const reviewsCollection = getDb("usersDb", "review")
const ordersCollection = getDb("usersDb", "order")


const connectToDB = () => {
    client
        .connect()
        .then(() => console.log("Successfully connected"))
        .catch(err => console.log(err))
}


module.exports = {
    productsCollection,
    usersCollection,
    reviewsCollection,
    ordersCollection,
    connectToDB
}