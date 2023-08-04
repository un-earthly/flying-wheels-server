import { User } from '../user/user.model';
import { IUserCredentials } from './auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../user/user.interface';
import { comparePassword } from '../../../../utils/comparePassword';
import ApiError from '../../../../error/apiError';
import httpStatus from 'http-status';
import { generateToken, verifyToken } from '../../../../utils/token';
import nodemailer, { TransportOptions } from "nodemailer"

const JWT_SECRET = 'your_secret_key';

export const AuthService = {
    login: async (userData: IUserCredentials) => {
        const { email, password } = userData;

        // Check if the user with the provided email exists in the database
        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials.');
        }

        // Generate access token and refresh token
        const accessToken = generateToken({ _id: user._id, email: user.email, role: user.role });
        const refreshToken = generateToken({ _id: user._id, email: user.email, role: user.role });

        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
        user.save()
        return { accessToken, refreshToken };
    },

    logout: async (token: string) => {
        // You can handle logout logic here, such as invalidating the refresh token
        // and updating the user's last logout timestamp in the database.

        const user = await User.findOne({ refreshToken: token });

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
        }

        // Clear the refresh token for the user
        user.refreshToken = undefined;
        await user.save();

        return { message: 'Logout successful.' };
    },

    refreshToken: async (token: string) => {
        // Verify the provided refresh token
        const decodedToken = verifyToken(token)

        if (!decodedToken) {
            throw new ApiError(httpStatus.NOT_FOUND, "Invalid refresh token")
        }
        // Generate a new access token using the user ID from the decoded token
        const accessToken = generateToken({
            _id: decodedToken?._id,
            email: decodedToken?.email,
            role: decodedToken?.role
        })

        return { accessToken };

    },


    resetPass: async (payload: IUserCredentials) => {
        const { email, password } = payload;

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }

        const isPasswordValid = comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials.');
        }

        // Generate reset token for password reset
        const resetToken = generateToken({ _id: user._id, email: user.email, role: user.role });

        // Send the reset token to the user's email
        // const transporterOptions: TransportOptions = {
        //     secure: false, // Set to true if using SSL/TLS, or false if using non-SSL connection
        //     auth: {
        //         user: 'your_smtp_username',
        //         pass: 'your_smtp_password',
        //     },
        // };


        const transporter = nodemailer.createTransport();


        // Compose the email message
        const mailOptions = {
            from: 'www.flyingwheels@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `To reset your password, click on the following link: https://example.com/reset-password?token=${resetToken}`,
            html: `<p>To reset your password, click on the following link: <a href="https://example.com/reset-password?token=${resetToken}">Reset Password</a></p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return { message: 'Password reset token has been sent to your email.' };
    },
};
