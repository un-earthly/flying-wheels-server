import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../../../utils/isAdmin';
import { createOrderController, deleteOrderController, getOrderByIdController, getOrdersController, updateOrderStatusController } from './order.controller';

const router = Router();


// Create a new order
router.post('/', authenticate, createOrderController);

// Get a specific order by orderId
router.get('/:orderId', authenticate, getOrderByIdController);

// Update the status of an order by orderId
router.patch('/:orderId/status', authenticate, isAdmin, updateOrderStatusController);

// Delete an order by orderId
router.delete('/:orderId', authenticate, isAdmin, deleteOrderController);

// Get all orders
router.get('/', authenticate, isAdmin, getOrdersController);


export const OrderRoutes = router;
