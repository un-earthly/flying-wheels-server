import { Document, ObjectId } from 'mongoose';
export interface IWishlistItem {
    _id?: ObjectId;
    product: ObjectId;
    createdAt: Date;
}

export interface IWishlist extends Document {
    user: ObjectId;
    items: IWishlistItem[];
}
