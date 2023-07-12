import { ObjectId } from "mongodb"
import { ordersCollection } from "../db"

export const getOrderService = async () => {
    return await ordersCollection.find().toArray()
}

export const byEmailService = async (email: string) => {
    return await ordersCollection.find({ email }).toArray()
}

export const updateOrderService = async (id: string) => {
    const updateDoc = {
        $set: {
            shippedStatus: true
        }
    }
    return await ordersCollection.updateOne({ _id: new ObjectId(id) }, updateDoc)
}

export const deleteOrderService = async (id:string) => {
    return await ordersCollection.deleteOne({ _id: new ObjectId(id) })

}