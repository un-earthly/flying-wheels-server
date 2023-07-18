import { commonConf } from "../config/config";
const stripe = require("stripe")(commonConf.STRIPE__KEY);

export const paymentIntentService = async (price: number) => {
    const payableAmount = price * 100
    const paymentIntent = await stripe.paymentIntents.create({
        amount: payableAmount,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    })
    return { clientSecret: paymentIntent.client_secret }
}

export const updatePaymentOrderService = async ({ id, transactionId, paymentStatus }: { id: string, transactionId: string, paymentStatus: boolean }) => {
    const updateDoc = {
        $set: { transactionId, paymentStatus }
    };
    // return await ordersCollection.updateOne({ _id: new ObjectId(id) }, updateDoc)
}


export const getPayForService = async (id: string) => {
    // const payFor = await ordersCollection.findOne({ _id: new ObjectId(id) })
    // return payFor

}