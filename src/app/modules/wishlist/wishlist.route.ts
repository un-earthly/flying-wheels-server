import express from 'express';
import * as WishlistController from './wishlist.controller';
import { authenticate } from '../auth/auth.middlewares';

const router = express.Router();

router.get('/', authenticate, WishlistController.getUserWishlistItems);
router.post('/', authenticate, WishlistController.addToWishlist);
router.delete('/:productId', authenticate, WishlistController.removeFromWishlist);

export const WishlistRoutes = router;

