import { Schema, model } from 'mongoose';
import { IOrder, IOrderModel } from './order.interface';

const OrderSchema = new Schema<IOrder, IOrderModel>(
  {

  }
);

export const Order = model<IOrder, IOrderModel>('Order', OrderSchema);
