import mongoose, { Document, Schema } from 'mongoose';
import { IOrder, OrderStatus } from './order.interface';


const OrderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
