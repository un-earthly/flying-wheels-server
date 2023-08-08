import { NextFunction, Request, Response } from "express";

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