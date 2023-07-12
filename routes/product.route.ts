import { addProductController, deleteProductController, getAllProductController, getSingleProductController, purchaseProductController } from "../controller/product.controller";

const router = require('express').Router();
const verifyJWT = require('../middleweres/verifyJWT')


router.get('/list', getAllProductController)
router.post('/add', verifyJWT, addProductController)
router.get('/:id', verifyJWT, getSingleProductController)
router.delete('/product/:id', verifyJWT, deleteProductController)
router.post('/purchase', verifyJWT, purchaseProductController)

export default router
