import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendResponse } from '../../../../utils/resSender';
import catchAsync from '../../../../utils/catchAsync';
import { IUserCredentials } from './auth.interface';
import httpStatus from 'http-status';



export const login = catchAsync(async (req: Request, res: Response) => {
    const userData: IUserCredentials = req.body;

    const data = await AuthService.login(userData);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Login successful!',
        data
    });
});

export const logout = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    const data = await AuthService.logout(token);

    res.clearCookie('token');

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Logout successful!',
        data
    });
};

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    const data = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Token refreshed successfully!',
        data,
    });
};

export const resetPassword = async (req: Request, res: Response) => {
    const payload = req.body;

    const data = await AuthService.resetPassword(payload);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Password reset email sent successfully!',
        data
    });
};
