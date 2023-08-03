import { Schema, model } from 'mongoose';
import { IUser, UserRole } from '../interface/user.interface';

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: UserRole, required: true
    },
    profilePic: { type: String },
    paymentMethods: [{ type: String }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
},
    {
        timestamps: true
    });

const User = model<IUser>('User', userSchema);

export default User;
