import { ObjectId } from 'mongoose';
export interface IReview extends Document {
    user: ObjectId;
    product: ObjectId; // Product ID
    rating: number;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}
// export type IReviewModel = Model<IReview, Record<string, unknown>>;