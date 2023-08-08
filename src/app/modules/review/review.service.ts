import { IReview } from './review.interface';
import Review from './review.model';


export const createReview = async (reviewData: IReview): Promise<IReview> => {
    const review = await Review.create(reviewData);
    return review;
};

export const getProductReviews = async (productId: string): Promise<IReview[]> => {
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    return reviews;
};
