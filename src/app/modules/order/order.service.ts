import { IOrder } from './order.interface';
import Order from './order.model';

export const OrderService = {

    // Create a new order
    createOrder: async (orderData: IOrder): Promise<IOrder> => {
        return await Order.create(orderData);
    },

    // Get a specific order by orderId
    getOrderById: async (orderId: string): Promise<IOrder | null> => {
        return await Order.findById(orderId).populate('products.product');
    },

    // Update the status of an order by orderId
    updateOrderStatus: async (orderId: string, status: string): Promise<IOrder | null> => {
        return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    },

    // Delete an order by orderId
    deleteOrder: async (orderId: string): Promise<IOrder | null> => {
        return await Order.findByIdAndDelete(orderId);
    },

    // Get all orders
    getOrders: async (): Promise<IOrder[]> => {
        return await Order.find().populate('products.product');
    },

};
