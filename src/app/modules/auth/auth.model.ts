import mongoose, { Schema } from "mongoose";
import { AuthProvider, IAuth } from "./auth.interface";

const authSchema = new Schema<IAuth>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        provider: {
            type: String, enum: Object.values(AuthProvider),
            required: true
        },
        loginInfo: {
            ipAddress: {
                type: String,
                required: true
            },
            userAgent: {
                type: String,
                required: true
            },
        },
        registerInfo: {
            ipAddress: {
                type: String,
                required: true
            },
            userAgent: {
                type: String,
                required: true
            },
        },
    },
    { timestamps: true }
);

const Auth = mongoose.model<IAuth>('Auth', authSchema);

export default Auth;
