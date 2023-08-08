import { Document, ObjectId } from "mongoose";

export type IUserCredentials = {
    email: string;
    password: string;
}

export enum AuthProvider {
    LOCAL = 'local',
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
}

export interface IAuth extends Document {
    userId?: ObjectId;
    refreshToken?: string;
    accessToken?: string;
    provider?: AuthProvider;
    loginInfo?: {
        ipAddress: string;
        userAgent: string;
    };
    registerInfo?: {
        ipAddress: string;
        userAgent: string;
    };
}


// interface IUserWithLoginInfo extends IUser {
//     loginInfo: {
//         ipAddress: string;
//         userAgent: string;
//     };
// }