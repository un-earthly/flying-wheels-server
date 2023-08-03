const router = require('express').Router();
import verifyJWT from '../middleweres/verifyJWT';
import {
    byEmailController,
    updateOrderController,
    deleteOrderController,
    getOrdersController
} from '../controller/order.controller';

router.get('/', getOrdersController)
router.get('/', verifyJWT, byEmailController)
router.patch('/:id', verifyJWT, updateOrderController)
router.delete('/:id', verifyJWT, deleteOrderController)


export default router
