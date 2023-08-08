import httpStatus from "http-status";
import ApiError from "../../../error/apiError";
import { IReview } from "../../../interface/review.interface";
import Review from "../../../../model/review.model";
import { IProduct, IProductCategory } from "./product.interface";
import Product from "./product.model";
import { ObjectId } from "mongoose";


// Get all products
export const getProducts = async (): Promise<IProduct[]> => {
    const products = await Product.find();
    return products;
};

// Create a new product
export const createProduct = async (productData: IProduct): Promise<IProduct> => {
    const newProduct = await Product.create(productData);
    return newProduct;
};

// Get a single product by productId
export const getProductById = async (productId: string): Promise<IProduct | null> => {
    const product = await Product.findById(productId);
    return product;
};

// Update a product by productId
export const updateProduct = async (productId: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    return updatedProduct;
};

// Delete a product by productId
export const deleteProduct = async (productId: string): Promise<IProduct | null> => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
};

// Add a review for a product
export const addReview = async (productId: string, reviewData: IReview): Promise<IProduct | null> => {
    const product = await Product.findById(productId);
    if (!product) {
        return null;
    }
    const newReview = new Review(reviewData);
    product.reviews.push(newReview._id);
    await product.save();

    return product;
};

// Get all product categories
export const getProductCategories = async (): Promise<IProductCategory[]> => {
    const categories = await Product.distinct('category');
    if (categories.length === 0) {
        return [];
    }

    const productCategories: IProductCategory[] = categories.map((category: string) => ({
        name: category,
    }));
    return productCategories;

};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<IProduct[]> => {
    const products: IProduct[] = await Product.find({ category });

    if (products.length === 0) {
        return [];
    }

    return products;
}
// Search products by query
export const searchProducts = async (searchQuery: string): Promise<IProduct[]> => {
    const searchRegex = new RegExp(searchQuery, 'i');

    const products: IProduct[] = await Product.find({
        $or: [
            { name: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
        ],
    });

    // If no products found for the search query, return an empty array
    if (products.length === 0) {
        return [];
    }

    return products;
};

// Add product images
export const addProductImages = async (productId: string, images: string[]): Promise<IProduct | null> => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    product.images.push(...images);
    await product.save();

    return product;
};

// Delete a product image by imageId
export const deleteProductImage = async (productId: string, imageId: string): Promise<IProduct | null> => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    product.images = product.images.filter((image: string) => image !== imageId);
    await product.save();

    return product;
};
