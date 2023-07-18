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

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    profilePic: string;
    address: string;
    location: string;
    cards: ICardDetails[];
}
