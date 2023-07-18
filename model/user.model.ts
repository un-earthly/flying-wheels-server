import { Schema, model, Document } from 'mongoose';
import { IUser, UserRole } from '../interface/user.interface';

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [UserRole.ADMIN,
            UserRole.BUYER],
            default: UserRole.BUYER,
        },
        profilePic: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        location: {
            type: String,
            default: '',
        },
        cards: [
            {
                cardNumber: {
                    type: String,
                    required: true,
                },
                cardHolderName: {
                    type: String,
                    required: true,
                },
                expirationDate: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;
