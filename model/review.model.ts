import { model, Schema } from 'mongoose';
import { IReview } from '../interface/review.interface';

const reviewSchema = new Schema<IReview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;