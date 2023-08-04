import express from 'express';
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, getUserOrdersController, getUserReviewsController, getUserWishlistController, updateUserController, updateUserRoleController } from "./user.controller"
import { authenticate } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../../../utils/isAdmin';

const router = express.Router();

// Create a new user
router.post('/', createUserController);

// Get a user by ID
router.get('/:userId', authenticate, getUserByIdController);

// Update a user by ID
router.patch('/:userId', authenticate, updateUserController);

// Get a user's orders by ID
router.get('/:userId/orders', authenticate, getUserOrdersController);

// Get a user's reviews by ID
router.get('/:userId/reviews', authenticate, getUserReviewsController);

// Get a user's wishlist by ID
router.get('/:userId/wishlist', authenticate, getUserWishlistController);

// Delete a user by ID
router.delete('/:userId', authenticate, deleteUserController);

// Get all users (admin-only route)
router.get('/', authenticate, isAdmin, getAllUsersController);

// Update a user's role by ID (admin-only route)
router.patch('/:userId/role', authenticate, isAdmin, updateUserRoleController);

export const UserRoutes = router;

