import { model, Schema } from 'mongoose';
import { IOrder, IOrderProduct, OrderStatus } from '../interface/order.interface';

const orderProductSchema = new Schema<IOrderProduct>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    products: [orderProductSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
}
    , {
        timestamps: true
    });

const Order = model<IOrder>('Order', orderSchema);

export default Order;
