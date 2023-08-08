import { Schema, model, Document } from 'mongoose';
import { IReview } from './review.interface';


const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Review = model<IReview>('Review', reviewSchema);

export default Review;
