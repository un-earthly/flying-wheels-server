import { Document } from 'mongoose';
import { IProduct } from '../product/product.interface';
import { IUser } from '../user/user.interface';

export interface IWishlistItem {
    _id: string;
    product: IProduct;
    createdAt: Date;
}

export interface IWishlist extends Document {
    user: IUser['_id'];
    items: IWishlistItem[];
}
