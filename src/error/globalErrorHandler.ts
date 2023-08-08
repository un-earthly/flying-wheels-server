import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { IGenericErrorMessage } from "../interface/error.interface";
import ApiError from "./apiError";
import handleCastError from "./castError";
import handleValidationError from "./validationError";
import { commonConf } from "../config/config";

const globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: commonConf.node_env !== 'production' ? error?.stack : undefined,
    });
};

export default globalErrorHandler;