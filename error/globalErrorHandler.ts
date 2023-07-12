import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ApiError from './apiError';
import { commonConf } from '../config/config';
import IGenericErrorMessage from '../interface/errorResponse';
export const globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = [];
  
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: commonConf.node_env === 'production' ? undefined : error?.stack,
    });

    next();
};