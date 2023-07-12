import { Response } from "express";
import { IAPIResponse } from "../interface/apiResonpons";
export const sendResponse = <T>(res: Response, data: IAPIResponse<T>): void => {
    const responseData: IAPIResponse<T> = {
        status: data.status,
        success: data.success,
        message: data.message,
        data: data.data,
    };

    res.status(data.status).json(responseData);
};