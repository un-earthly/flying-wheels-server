import {
    getPayForController,
    paymentIntentController,
    updatePaymentOrderController,
} from "../controller/payment.controller";

const router = require('express').Router();
import verifyJWT from '../middleweres/verifyJWT';


router.post("/create-payment-intent", verifyJWT, paymentIntentController);


router.patch('/:id', verifyJWT, updatePaymentOrderController)
router.get('/:id', getPayForController)


export default router