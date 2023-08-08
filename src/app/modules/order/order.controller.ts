import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { sendResponse } from '../../../../utils/resSender';
import httpStatus from 'http-status';
// Create a new order
export const createOrderController = async (req: Request, res: Response) => {
    const orderData = req.body;
    const order = await OrderService.createOrder(orderData);
    sendResponse(res, {
        data: order,
        status: httpStatus.OK,
        success: true,
        message: 'Order created successfully'
    });
};

// Get a specific order by orderId
export const getOrderByIdController = async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const order = await OrderService.getOrderById(orderId);
    sendResponse(res, {
        data: order,
        status: httpStatus.OK,
        success: true,
        message: 'Order fetched successfully'
    });
};

// Update the status of an order by orderId
export const updateOrderStatusController = async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const status = req.body.status;
    const updatedOrder = await OrderService.updateOrderStatus(orderId, status);
    sendResponse(res, {
        data: updatedOrder,
        status: httpStatus.OK,
        success: true,
        message: 'Order status updated successfully'
    });
};

// Delete an order by orderId
export const deleteOrderController = async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const deletedOrder = await OrderService.deleteOrder(orderId);
    sendResponse(res, {
        data: deletedOrder,
        status: httpStatus.OK,
        success: true,
        message: 'Order deleted successfully'
    });
};

// Get all orders
export const getOrdersController = async (_req: Request, res: Response) => {
    const orders = await OrderService.getOrders();
    sendResponse(res, {
        data: orders,
        status: httpStatus.OK,
        success: true,
        message: 'Order Found SuccessFully'
    });
};
