import { Request, Response } from "express"
import { sendResponse } from "../utils/resSender"
import httpStatus from "http-status"
import { addReviewService, getReviewService } from "../service/review.service"
import catchAsync from "../utils/catchAsync"

export const getReviewsController = catchAsync(async (req: Request, res: Response) => {

    const result = await getReviewService()

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

})

export const addReviewsColltroller = (req: Request, res: Response) => {

    const result = addReviewService({})

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
