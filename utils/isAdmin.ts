import { Request, Response, NextFunction } from 'express';
import { ITokenPayload } from '../src/interface/tokenPayload';

// Function to check if the user is an admin
export const isAdmin = (user: ITokenPayload): boolean => {
    return user.role === 'admin';
};

// Middleware to protect admin-only routes
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Assuming you have set the user object in the request during authentication

    if (!user || !isAdmin(user)) {
        return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
};
