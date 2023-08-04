import express from 'express';
import * as WishlistController from './wishlist.controller';
import { authenticate } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', authenticate, WishlistController.addToWishlist);
router.delete('/remove/:productId', authenticate, WishlistController.removeFromWishlist);
router.get('/items', authenticate, WishlistController.getUserWishlistItems);

export default router;
