import express from 'express';
import {
    addProductController,
    getAllProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
} from '../controller/product.controller';

const router = express.Router();

router.post('/', addProductController);
router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;
