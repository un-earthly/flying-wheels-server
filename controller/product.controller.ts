import httpStatus from "http-status"
import { sendResponse } from "../utils/resSender"
import { addPRoductService, deleteProductService, getAllProductService, getSingleProductService, purchaseProductService } from "../service/product.service"
import { Request, Response } from "express"
import ApiError from "../error/apiError"

export const getAllProductController = (req: Request, res: Response) => {

    const result = getAllProductService()

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
export const getSingleProductController = (req: Request, res: Response) => {

    const result = getSingleProductService(req.params.id)

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}
export const addProductController = (req: Request, res: Response) => {

    if (!req.body.data) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found")
    }
    const {
        availableQty,
        desc,
        img,
        minOrdQty,
        name,
        pricePerUnit
    } = req.body.data
    const result = addPRoductService({
        availableQty,
        desc,
        img,
        minOrdQty,
        name,
        pricePerUnit
    })

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}


export const deleteProductController = (req: Request, res: Response) => {

    const result = deleteProductService(req.params.id)

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}

export const purchaseProductController = (req: Request, res: Response) => {

    const result = purchaseProductService({
        id: req.params.id,
        email: "req.decoded.email",

    }, req.body)

    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success: true
    })

}