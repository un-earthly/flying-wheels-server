// authMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { ITokenPayload } from '../../../interface/tokenPayload';
import httpStatus from 'http-status';

// Middleware function to protect routes requiring authentication
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token from the request header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            // Token not provided, unauthorized access
            return res.status(401).json({ error: 'Access denied. Token not provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY as Secret);
        req.user = decoded as ITokenPayload;
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Invalid token.' });
    }
};
