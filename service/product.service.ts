import { ObjectId } from "mongodb"
import { ordersCollection, productsCollection, usersCollection } from "../db"
import { IProduct } from "../interface/product"
import ApiError from "../error/apiError"
import httpStatus from "http-status"

export const getAllProductService = async () => {
    return await productsCollection.find().toArray()
}
export const getSingleProductService = async (id: string) => {
    return await productsCollection.findOne({ _id: new ObjectId(id) })
}
export const addPRoductService = async (data: IProduct) => {
    return await productsCollection.insertOne(data)
}
export const deleteProductService = async (id: string) => {
    return await productsCollection.deleteOne(new ObjectId(id))
}


export const purchaseProductService = async (data: { id: string, email: string }, product: IProduct) => {
    const { id, email } = data;
    const existing = await ordersCollection.findOne({ id, email });
    const isAdmin = await usersCollection.findOne({ email });

    if (isAdmin && isAdmin.admin) {
        throw new ApiError(httpStatus.FORBIDDEN, "Admins can't order");
    }

    if (existing) {
        throw new ApiError(httpStatus.CONFLICT, "Order already exists");
    }

    const newOrder = await ordersCollection.insertOne(product);
    return newOrder;
};
