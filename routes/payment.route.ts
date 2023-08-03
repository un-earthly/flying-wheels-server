import {
    getPayForController,
    paymentIntentController,
    updatePaymentOrderController,
} from "../controller/payment.controller";

const router = require('express').Router();
import verifyJWT from '../middleweres/verifyJWT';


router.get('/:id', getPayForController)
router.post("/create-payment-intent", verifyJWT, paymentIntentController);
router.patch('/:id', verifyJWT, updatePaymentOrderController)


export default router