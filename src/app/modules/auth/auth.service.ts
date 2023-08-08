import { User } from '../user/user.model';
import { AuthProvider, IAuth, IUserCredentials } from './auth.interface';
import { IUser } from '../user/user.interface';
import { comparePassword } from '../../../../utils/comparePassword';
import ApiError from '../../../../error/apiError';
import httpStatus from 'http-status';
import { generateRefreshToken, generateToken, verifyToken } from '../../../../utils/token';
import nodemailer, { TransportOptions } from "nodemailer"
import Auth from './auth.model';
import { jwtConf } from '../../../../config/config';
import { ITokenPayload } from '../../../../interface/tokenPayload';

export const AuthService = {
    register: async (userData: IUser, authInfo: Partial<IAuth>) => {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use');
        }

        // Create a new user
        const newUser = await User.create(userData);


        const tokenPayload: ITokenPayload = {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role
        }


        // Generate tokens
        const accessToken = generateToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);


        // Create an Auth document
        const authData = new Auth({
            userId: newUser._id,
            refreshToken,
            accessToken,
            provider: AuthProvider.LOCAL,
            loginInfo: authInfo.loginInfo,
            registerInfo: authInfo.registerInfo,
        });

        // Save the Auth document
        await authData.save();


        newUser.accessToken = accessToken;
        newUser.refreshToken = refreshToken;

        return {
            user: newUser,
        };
    },

    login: async (userData: IUserCredentials) => {
        const { email, password } = userData;

        // Check if the user with the provided email exists in the database
        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
        }

        // Compare the provided password with the hashed password in the database
        // const isPasswordValid = comparePassword(password, user.password);

        if (!comparePassword(user.password, password)) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Password.');
        }
        const tokenPayload: ITokenPayload = { _id: user._id, email: user.email, role: user.role }

        // Generate access token and refresh token
        const accessToken = generateToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

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
        user.accessToken = undefined;
        await user.save();

        return { message: 'Logout successful.' };
    },

    refreshToken: async (token: string) => {
        // Verify the provided refresh token
        const decodedToken = verifyToken(token, jwtConf.refreshTokenSecret);

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


    resetPassword: async (payload: IUserCredentials) => {
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
