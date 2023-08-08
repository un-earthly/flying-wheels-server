/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
const router = Router();
import { isAdmin } from '../../../../utils/isAdmin';
import {
    addProductImagesController,
    addReviewController,
    createProductController,
    deleteProductController,
    deleteProductImageController,
    getProductByIdController,
    getProductCategoriesController,
    getProductsByCategoryController,
    getProductsController,
    searchProductsController,
    updateProductController
} from './product.controller';
import { authenticate } from '../auth/auth.middlewares';


// Public route to get all products
router.get('/', getProductsController);

// Admin route to create a new product
router.post('/', authenticate, isAdmin, createProductController);

// Public route to get a single product by productId
router.get('/:productId', getProductByIdController);

// Admin route to update a product by productId
router.patch('/:productId', authenticate, isAdmin, updateProductController);

// Admin route to delete a product by productId
router.delete('/:productId', authenticate, isAdmin, deleteProductController);

// Public route to add a review for a product
router.post('/:productId/reviews', authenticate, addReviewController);

// Public route to get all product categories
router.get('/categories', getProductCategoriesController);

// Public route to get products by category
router.get('/', getProductsByCategoryController);

// Public route to search products by query
router.get('/search', searchProductsController);

// Admin route to add product images
router.post('/:productId/images', authenticate, isAdmin, addProductImagesController);

// Admin route to delete a product image by imageId
router.delete('/:productId/images/:imageId', authenticate, isAdmin, deleteProductImageController);


export const ProductRoutes = router;
