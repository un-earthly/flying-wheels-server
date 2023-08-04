import { Schema, model } from 'mongoose';
import { IUser, IUserModel, UserRole } from './user.interface';

const UserSchema = new Schema<IUser, IUserModel>({
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
  profilePic: {
    type: String
  },
  paymentMethods: [{
    type: String
  }],
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
  accessToken: {
    type: String,
    default: undefined,
  },
  refreshToken: {
    type: String,
    default: undefined,
  },
},
  {
    timestamps: true
  });


export const User = model<IUser, IUserModel>('User', UserSchema);
