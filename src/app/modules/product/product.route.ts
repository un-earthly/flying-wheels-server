/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
const router = Router();
import {
    getProducts, createProduct, getProductById, updateProduct, deleteProduct, addReview, getProductCategories,
    getProductsByCategory, searchProducts, addProductImages, deleteProductImage
} from './product.controller';
import { authenticate } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../../../utils/isAdmin';


// Public route to get all products
router.get('/', getProducts);

// Admin route to create a new product
router.post('/', authenticate, isAdmin, createProduct);

// Public route to get a single product by productId
router.get('/:productId', getProductById);

// Admin route to update a product by productId
router.patch('/:productId', authenticate, isAdmin, updateProduct);

// Admin route to delete a product by productId
router.delete('/:productId', authenticate, isAdmin, deleteProduct);

// Public route to add a review for a product
router.post('/:productId/reviews', authenticate, addReview);

// Public route to get all product categories
router.get('/categories', getProductCategories);

// Public route to get products by category
router.get('/', getProductsByCategory);

// Public route to search products by query
router.get('/search', searchProducts);

// Admin route to add product images
router.post('/:productId/images', authenticate, isAdmin, addProductImages);

// Admin route to delete a product image by imageId
router.delete('/:productId/images/:imageId', authenticate, isAdmin, deleteProductImage);


export const ProductRoutes = router;
