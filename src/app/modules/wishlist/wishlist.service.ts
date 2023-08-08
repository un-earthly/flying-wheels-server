import httpStatus from "http-status";
import ApiError from "../../../error/apiError";
import { IUser } from "../user/user.interface";
import { IWishlist, IWishlistItem } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";
import { ObjectId } from "mongoose";
import Product from "../product/product.model";


// Add a product to the user's wishlist
export const addToWishlist = async (user: IUser, productId: ObjectId): Promise<IWishlist> => {
    const product = await Product.findById(productId).exec();

    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    // Check if the product is already in the wishlist
    const existingWishlist = await Wishlist.findOne({ user: user._id }).exec();

    if (existingWishlist) {
        const existingItem = existingWishlist.items.find((item) => item.product === productId);

        if (existingItem) {
            throw new ApiError(httpStatus.CONFLICT, 'Product already in wishlist');
        }

        // Add the new product to the existing wishlist
        existingWishlist.items.push({ product: productId, createdAt: new Date() });
        return existingWishlist.save();
    }

    // Create a new wishlist if none exists for the user
    const newWishlist = {
        user: user._id,
        items: [{ product: productId, createdAt: new Date() }],
    };

    return await Wishlist.create(newWishlist);
};




// Remove a product from the user's wishlist
export const removeFromWishlist = async (user: IUser, productId: string): Promise<IWishlist> => {
    const existingWishlist = await Wishlist.findOne({ user: user._id }).exec();

    if (!existingWishlist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
    }

    // Remove the product from the wishlist
    existingWishlist.items = existingWishlist.items.filter((item) => item.product.toString() !== productId);
    return existingWishlist.save();
};

// Get all wishlist items for the authenticated user
export const getUserWishlistItems = async (user: IUser): Promise<IWishlistItem[]> => {
    const existingWishlist = await Wishlist.findOne({ user: user._id }).populate('items.product').exec();

    if (!existingWishlist) {
        return [];
    }

    return existingWishlist.items;
};
