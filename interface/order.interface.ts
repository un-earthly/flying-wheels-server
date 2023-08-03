import { ObjectId } from 'mongoose';
import { Document, Schema } from 'mongoose';
export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}
export interface IOrder extends Document {
    user: ObjectId;
    products: IOrderProduct[];
    totalAmount: number;
    orderDate: Date;
    status: OrderStatus;
}

export interface IOrderProduct {
    product: ObjectId;
    quantity: number;
    unitPrice: number;
}
