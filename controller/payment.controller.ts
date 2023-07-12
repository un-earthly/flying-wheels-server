import httpStatus from "http-status"
import { getPayForService, paymentIntentService, updatePaymentOrderService } from "../service/payment.service"
import { sendResponse } from "../utils/resSender"
import { Request, Response } from "express"

export const paymentIntentController = (req: Request, res: Response) => {

    const result = paymentIntentService(Number(req.body.price))

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
export const updatePaymentOrderController = (req: Request, res: Response) => {

    const result = updatePaymentOrderService({
        id: req.params.id,
        paymentStatus: req.body.paymentStatus,
        transactionId: req.body.transactionId
    })

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
export const getPayForController = (req: Request, res: Response) => {

    const result = getPayForService(req.params.id)

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}