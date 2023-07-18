import { Request, Response } from "express";
import { IAPIResponse } from "../interface/apiResonpons";
import { IProduct } from "../interface/product.interface";
import { addProductService, deleteProductService, getAllProductService, getProductByIdService, updateProductService } from "../service/product.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/resSender";

export const addProductController = catchAsync(async (req: Request, res: Response) => {
    const newProductData: IProduct = req.body;
    const newProduct = await addProductService(newProductData);

    const responseData: IAPIResponse<IProduct> = {
        status: 201,
        success: true,
        message: 'Product created successfully',
        data: newProduct,
    };

    sendResponse(res, responseData);
});

export const getAllProductController = catchAsync(async (req: Request, res: Response) => {
    const products = await getAllProductService();

    const responseData: IAPIResponse<IProduct[]> = {
        status: 200,
        success: true,
        message: 'Products retrieved successfully',
        data: products,
    };

    sendResponse(res, responseData);
});

export const getProductByIdController = catchAsync(async (req: Request, res: Response) => {
    const productId: string = req.params.id;
    const product = await getProductByIdService(productId);

    if (!product) {
        const responseData: IAPIResponse<null> = {
            status: 404,
            success: false,
            message: 'Product not found',
            data: null,
        };
        sendResponse(res, responseData);
        return;
    }

    const responseData: IAPIResponse<IProduct> = {
        status: 200,
        success: true,
        message: 'Product retrieved successfully',
        data: product,
    };

    sendResponse(res, responseData);
});

export const updateProductController = catchAsync(async (req: Request, res: Response) => {
    const productId: string = req.params.id;
    const updateData: Partial<IProduct> = req.body;
    const updatedProduct = await updateProductService(productId, updateData);

    if (!updatedProduct) {
        const responseData: IAPIResponse<null> = {
            status: 404,
            success: false,
            message: 'Product not found',
            data: null,
        };
        sendResponse(res, responseData);
        return;
    }

    const responseData: IAPIResponse<IProduct> = {
        status: 200,
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
    };

    sendResponse(res, responseData);
});

export const deleteProductController = catchAsync(async (req: Request, res: Response) => {
    const productId: string = req.params.id;
    const deletedProduct = await deleteProductService(productId);

    if (!deletedProduct) {
        const responseData: IAPIResponse<null> = {
            status: 404,
            success: false,
            message: 'Product not found',
            data: null,
        };
        sendResponse(res, responseData);
        return;
    }

    const responseData: IAPIResponse<IProduct> = {
        status: 200,
        success: true,
        message: 'Product deleted successfully',
        data: deletedProduct,
    };

    sendResponse(res, responseData);
});