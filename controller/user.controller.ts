import {
    createUserService,
    getUserByEmailService,
    getUserService,
    makeAdminService,
    ReviewService,
    updateProfileService,
    updateUserService,

} from "../service/user.service"
import { Request, Response } from "express"
import { sendResponse } from "../utils/resSender"
import httpStatus from "http-status"
import catchAsync from "../utils/catchAsync"

export const getUsersController = catchAsync((req: Request, res: Response) => {

    const result = getUserService()

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

})


export const getUserByEmailController = (req: Request, res: Response) => {

    const result = getUserByEmailService("")

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}


export const updateUserController = (req: Request, res: Response) => {

    const result = updateUserService({ email: "", name: "" })

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
export const createUserController = (req: Request, res: Response) => {

    const result =createUserService()

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}

export const getReviewController = (req: Request, res: Response) => {

    const result = ReviewService("")

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}

export const makeAdminController = (req: Request, res: Response) => {

    const result = makeAdminService("")

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
export const updateProfileController = (req: Request, res: Response) => {

    const result = updateProfileService({ education: "", email: "", img: "", linkedin: "", location: "", name: "", phone: "" })

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}