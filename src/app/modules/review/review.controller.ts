import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as ReviewService from "./review.service"
import { IReview } from './review.interface';
import { sendResponse } from '../../../../utils/resSender';
export const createReviewController = async (req: Request, res: Response) => {
    const reviewData: IReview = req.body;
    const review = await ReviewService.createReview(reviewData);
    sendResponse(res, {
        data: review,
        message: 'Review created successfully',
        status: httpStatus.OK,
        success:true
    });
};

export const getProductReviewsController = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const reviews = await ReviewService.getProductReviews(productId);
    sendResponse(res, {
        data: reviews,
        message: 'Product reviews fetched successfully',
        status: httpStatus.OK,
        success: true
    });
};
