// controllers/user.controller.ts
import { Request, Response } from 'express';
import {
    createUser,
    getUserById,
    updateUser,
    getUserOrders,
    getUserReviews,
    getUserWishlist,
    deleteUser,
    getAllUsers,
    updateUserRole,
} from './user.service';
import { sendResponse } from '../../../../utils/resSender';
import httpStatus from 'http-status';

export const createUserController = async (req: Request, res: Response) => {
    const userData = req.body;

    const data = await createUser(userData);

    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'User created successfully!',
        data,
    });
};

export const getUserByIdController = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const data = await getUserById(userId);

    if (!data) {
        sendResponse(res, {
            status: httpStatus.NOT_FOUND,
            success: false,
            message: 'User not found!',
            data: null
        });
    } else {
        sendResponse(res, {
            status: httpStatus.OK,
            success: true,
            message: 'User details fetched successfully!',
            data,
        });
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updateData = req.body;

    const data = await updateUser(userId, updateData);

    if (!data) {
        sendResponse(res, {
            status: httpStatus.NOT_FOUND,
            success: false,
            message: 'User not found!',
            data
        });
    } else {
        sendResponse(res, {
            status: httpStatus.OK,
            success: true,
            message: 'User updated successfully!',
            data
        });
    }
};

export const getUserOrdersController = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const userOrders = await getUserOrders(userId);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'User orders fetched successfully!',
        data: userOrders,
    });
};

export const getUserReviewsController = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const userReviews = await getUserReviews(userId);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'User reviews fetched successfully!',
        data: userReviews,
    });
};

export const getUserWishlistController = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const userWishlist = await getUserWishlist(userId);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'User wishlist fetched successfully!',
        data: userWishlist,
    });
};

export const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const data = await deleteUser(userId);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'User deleted successfully!',
        data
    });
};

export const getAllUsersController = async (req: Request, res: Response) => {
    const allUsers = await getAllUsers();

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'All users fetched successfully!',
        data: allUsers,
    });
};

export const updateUserRoleController = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const roleData = req.body;

    const data = await updateUserRole(userId, roleData);

    if (!data) {
        sendResponse(res, {
            status: httpStatus.NOT_FOUND,
            success: false,
            message: 'User not found!',
            data: null
        });
    } else {
        sendResponse(res, {
            status: httpStatus.OK,
            success: true,
            message: 'User role updated successfully!',
            data
        });
    }
};
