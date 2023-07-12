const router = require('express').Router();
import verifyJWT from '../middleweres/verifyJWT';
import {
    byEmailController,
    updateOrderController,
    deleteOrderController,
    getOrdersController
} from '../controller/order.controller';

router.get('/list', getOrdersController)
router.patch('/:id', verifyJWT, updateOrderController)
router.get('/by-email', verifyJWT, byEmailController)
router.delete('/:id', verifyJWT, deleteOrderController)


export default router
