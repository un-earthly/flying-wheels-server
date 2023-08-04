import { Request, Response } from 'express';
import * as WishlistService from './wishlist.service';
import { IUser } from '../user/user.interface';
import catchAsync from '../../../../utils/catchAsync';
import { sendResponse } from '../../../../utils/resSender';
import httpStatus from 'http-status';

// Add a product to the user's wishlist
export const addToWishlist = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const { productId } = req.body;

    const data = await WishlistService.addToWishlist(user, productId);
    sendResponse(res, {
        data,
        message: "Added to Wishlist Successfully",
        status: httpStatus.OK,
        success: true
    })
})

// Remove a product from the user's wishlist
export const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const { productId } = req.params;

    const data = await WishlistService.removeFromWishlist(user, productId);
    sendResponse(res, {
        data,
        message: "Removed from Wishlist Successfully",
        status: httpStatus.OK,
        success: true
    })
});

// Get all wishlist items for the authenticated user
export const getUserWishlistItems = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const data = await WishlistService.getUserWishlistItems(user);
    sendResponse(res, {
        data,
        message: "Wishlist list found Successfully",
        status: httpStatus.OK,
        success: true
    })
})
