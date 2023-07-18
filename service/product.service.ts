import { IProduct } from "../interface/product.interface";
import Product from "../model/product.model";


export const addProductService = async (productData: IProduct): Promise<IProduct> => {
    const newProduct = await Product.create(productData);
    return newProduct
};

export const getAllProductService = async (): Promise<IProduct[]> => {
    return await Product.find();
};

export const getProductByIdService = async (productId: string): Promise<IProduct | null> => {
    return await Product.findById(productId);
};

export const updateProductService = async (productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

export const deleteProductService = async (productId: string): Promise<IProduct | null> => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct ? deletedProduct.toObject() : null;
};