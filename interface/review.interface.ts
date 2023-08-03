import { ObjectId } from "mongoose";

export interface IReview {
    _id: string;
    user: ObjectId;
    product: ObjectId;
    rating: number;
    comment?: string;
}