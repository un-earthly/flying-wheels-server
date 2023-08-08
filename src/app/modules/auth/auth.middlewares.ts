import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../../../interface/tokenPayload";
import { verifyToken } from "../../../../utils/token";
import { jwtConf } from "../../../config/config";
import httpStatus from "http-status";
import ApiError from "../../../error/apiError";

export const addLoginInfo = (req: Request, res: Response, next: NextFunction) => {
    req.body.loginInfo = {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
    };
    next();
};
export const addRegisterInfo = (req: Request, res: Response, next: NextFunction) => {
    req.body.registerInfo = {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
    };
    next();
};


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token from the request header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            // Token not provided, unauthorized access
            return res.status(httpStatus.FORBIDDEN).json({ error: 'Access denied. Token not provided.' });
        }
        let verifiedUser = null;
        // Verify the token
        
        verifiedUser = verifyToken(token, jwtConf.secret)


        if (!verifiedUser) {
            throw new ApiError(httpStatus.FORBIDDEN, "Access denied")
        }

        req.user = verifiedUser;
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Invalid token.' });
    }
};
