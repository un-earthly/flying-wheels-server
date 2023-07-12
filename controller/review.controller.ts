import { Request, Response } from "express"
import { sendResponse } from "../utils/resSender"
import httpStatus from "http-status"
import { addReviewService, getReviewService } from "../service/review.service"

export const getReviewsController = (req: Request, res: Response) => {

    const result = getReviewService()

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}

export const addReviewsColltroller = (req: Request, res: Response) => {

    const result = addReviewService({})

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
