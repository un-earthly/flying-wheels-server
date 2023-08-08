import httpStatus from "http-status";
import ApiError from "../../../error/apiError";
import { User } from "./user.model";
import { IOrder } from "../order/order.interface";
import { Wishlist } from "../wishlist/wishlist.model";
import { IWishlist } from "../wishlist/wishlist.interface";
import { IUser, UserRole } from "./user.interface";
import Order from "../order/order.model";
import Review from "../review/review.model";
import { IReview } from "../review/review.interface";

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    // Create a new user and save it to the database
    const newUser = await User.create(userData);
    return newUser
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
    // Get a user by ID from the database
    return await User.findById(userId).exec();
};

export const updateUser = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    // Update a user by ID in the database
    return await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
};

export const getUserOrders = async (userId: string): Promise<IOrder[]> => {
    const user = await User.findById(userId).exec();

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Find orders associated with the user
    const orders = await Order.find({ user: user._id }).exec();

    return orders;
};

export const getUserReviews = async (userId: string): Promise<IReview[]> => {
    const user = await User.findById(userId).exec();

    if (!user) {
        throw new Error('User not found');
    }

    // Find reviews associated with the user
    const reviews = await Review.find({ user: user._id }).exec();

    return reviews;
};

export const getUserWishlist = async (userId: string): Promise<IWishlist[]> => {
    const user = await User.findById(userId).exec();

    if (!user) {
        throw new Error('User not found');
    }

    // Find wishlist items associated with the user
    const wishlistItems = await Wishlist.find({ user: user._id }).exec();

    return wishlistItems;
};

export const deleteUser = async (userId: string): Promise<void> => {
    // Delete a user by ID from the database
    await User.findByIdAndDelete(userId).exec();
};

export const getAllUsers = async (): Promise<IUser[]> => {
    // Get all users from the database (admin-only route)
    return await User.find().exec();
};

export const updateUserRole = async (userId: string, roleData: { role: UserRole }): Promise<IUser | null> => {
    // Update a user's role by ID in the database (admin-only route)
    return await User.findByIdAndUpdate(userId, { role: roleData.role }, { new: true }).exec();
};
