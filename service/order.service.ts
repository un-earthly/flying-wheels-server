import { ObjectId } from "mongodb"

export const getOrderService = async () => {
    // return await Order.find().toArray()
}

export const byEmailService = async (email: string) => {
    // return await Order.find({ email }).toArray()
}

export const updateOrderService = async (id: string) => {
    const updateDoc = {
        $set: {
            shippedStatus: true
        }
    }
    // return await Order.updateOne({ _id: new ObjectId(id) }, updateDoc)
}

export const deleteOrderService = async (id:string) => {
    // return await Order.deleteOne({ _id: new ObjectId(id) })

}