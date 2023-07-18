import { NextFunction, Request, Response } from "express";
import { verifyToken } from '../utils/token';


export default function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized User' })
    }
    const token = authHeader.split(' ')[1];

    next(verifyToken(token))
}