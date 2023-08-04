import { Document, Model } from "mongoose";
export interface ICreateUserInput {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
export enum UserRole {
    ADMIN = 'admin',
    BUYER = 'buyer',
}

export interface ICardDetails {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
}
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    name?: string;
    phone?: string;
    address?: string;
    role: UserRole;
    profilePic?: string;
    paymentMethods?: string[];
    orders?: string[];
    reviews?: string[];
    wishlist?: string[];
    accessToken?: string;
    refreshToken?: string;
}

export type IUserModel = Model<IUser, Record<string, unknown>>;