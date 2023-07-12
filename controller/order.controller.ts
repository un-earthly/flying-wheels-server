import {
    byEmailService,
    deleteOrderService,
    getOrderService,
    updateOrderService
} from "../service/order.service"
import { sendResponse } from "../utils/resSender"
import httpStatus from "http-status"
import { Request, Response } from "express"

export const getOrdersController = (req: Request, res: Response) => {

    const result = getOrderService()

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}


export const byEmailController = (req: Request, res: Response) => {

    const result = byEmailService("")

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}


export const updateOrderController = (req: Request, res: Response) => {

    const result = updateOrderService("")

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}


export const deleteOrderController = (req: Request, res: Response) => {

    const result = deleteOrderService("")

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}