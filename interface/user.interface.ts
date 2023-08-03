import { Document } from "mongoose";

export enum UserRole {
    ADMIN = 'admin',
    BUYER = 'buyer',
}

export interface ICardDetails {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
}
export interface IUser extends Document{
    // _id: string; // MongoDB ObjectId (generated automatically)
    username: string;
    email: string;
    password: string;
    name?: string;
    phone?: string;
    address?: string;
    role: UserRole;
    profilePic?: string; // URL for profile picture
    paymentMethods?: string[]; // Array of saved payment methods
    orders?: string[]; // Array of order references (IDs)
    reviews?: string[]; // Array of review references (IDs)
    wishlist?: string[]; // Array of product references (IDs)
}
