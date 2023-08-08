import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../../../../utils/resSender';
import { IProduct } from './product.interface';
import catchAsync from '../../../../utils/catchAsync';
import * as productService from './product.service';
import ApiError from '../../../../error/apiError';
// GET /api/products - Get all products
export const getProductsController = catchAsync(async (req: Request, res: Response) => {
    const data = await productService.getProducts();

    sendResponse<IProduct[]>(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Fetched all products successfully!',
        data,
    });
});

// POST /api/products - Create a new product
export const createProductController = catchAsync(async (req: Request, res: Response) => {
    const productData = req.body;

    const newProduct = await productService.createProduct(productData);

    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Product created successfully!',
        data: newProduct,
    });
});

export const getProductByIdController = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);

    if (!product) {
        return sendResponse(res, {
            status: httpStatus.NOT_FOUND,
            success: false,
            message: 'Product not found!',
            data: null
        });
    }

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Fetched product by ID successfully!',
        data: product,
    });
});

export const updateProductController = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    const product = await productService.updateProduct(productId, updatedProductData);

    if (!product) {
        return sendResponse(res, {
            status: httpStatus.NOT_FOUND,
            success: false,
            message: 'Product not found!',
            data: null
        });
    }

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Product updated successfully!',
        data: product,
    });
});
// DELETE /api/products/:productId - Delete a product by productId
export const deleteProductController = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId;

    const product = await productService.deleteProduct(productId);

    if (!product) {
        return sendResponse(res, {
            status: httpStatus.NOT_FOUND,
            success: false,
            message: 'Product not found!',
            data: null
        });
    }

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Product deleted successfully!',
        data: product
    });
});

// POST /api/products/:productId/reviews - Add a review for a product

export const addReviewController = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const reviewData = req.body;

    // Assuming you have a separate review service function to handle the review creation
    const newReview = await productService.addReview(productId, reviewData);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Review added successfully!',
        data: newReview,
    });
});

// GET /api/products/categories - Get all product categories
export const getProductCategoriesController = catchAsync(async (req: Request, res: Response) => {
    const categories = await productService.getProductCategories();

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Product categories fetched successfully!',
        data: categories,
    });
});

// GET /api/products - Get products by category
export const getProductsByCategoryController = catchAsync(async (req: Request, res: Response) => {
    const { category } = req.query;
    if (!category || typeof category !== 'string') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category parameter is required and must be a string');
    }

    const products: IProduct[] = await productService.getProductsByCategory(category);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Products fetched successfully by category!',
        data: products,
    });
});

// GET /api/products/search - Search products by query

export const searchProductsController = catchAsync(async (req: Request, res: Response) => {
    const { q: searchQuery } = req.query;
    if (!searchQuery || typeof searchQuery !== 'string') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Search query parameter is required and must be a string');
    }

    const products: IProduct[] = await productService.searchProducts(searchQuery);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Products fetched successfully by search query!',
        data: products,
    });
});

// POST /api/products/:productId/images - Add product images
export const addProductImagesController = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { images } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Images array is required and must not be empty');
    }

    const product: IProduct | null = await productService.addProductImages(productId, images);

    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Product images added successfully!',
        data: product,
    });
});
// DELETE /api/products/:productId/images/:imageId - Delete a product image by imageId
export const deleteProductImageController = catchAsync(async (req: Request, res: Response) => {
    const { productId, imageId } = req.params;

    const product: IProduct | null = await productService.deleteProductImage(productId, imageId);

    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Product image deleted successfully!',
        data: product,
    });
});