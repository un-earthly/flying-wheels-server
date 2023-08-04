import { Document } from 'mongoose';
import { IUser } from '../user/user.interface';
export interface IWishlistItem {
    _id?: string;
    product: string;
    createdAt: Date;
}

export interface IWishlist extends Document {
    user: IUser['_id'];
    items: IWishlistItem[];
}
