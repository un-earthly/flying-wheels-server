import { Router } from 'express';
import * as ReviewController from './review.controller';
import { authenticate } from '../auth/auth.middlewares';

const router = Router();

// Create a review for a product
router.post('/:productId', authenticate, ReviewController.createReviewController);

// Get reviews for a product
router.get('/:productId', ReviewController.getProductReviewsController);

export const ReviewRoutes = router;
