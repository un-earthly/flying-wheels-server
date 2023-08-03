import { Request, Response } from "express"
import { sendResponse } from "../utils/resSender"
import httpStatus from "http-status"
import { loginService,  makeAdminService } from "../service/auth.service"

export const loginController = (req: Request, res: Response) => {

    const result = loginService(req.body)
    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success:true
    })

}

export const makeAdminController = (req: Request, res: Response) => {

    const result = makeAdminService(req.body)
    sendResponse(res, {
        status: httpStatus.OK,
        data: result,
        message: "Login successful",
        success:true
    })

}