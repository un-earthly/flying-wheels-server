import { Schema, model } from 'mongoose';
import { IUser, IUserModel, UserRole } from './user.interface';
import bcrypt from 'bcrypt';

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
    required: true,
    select: 0
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
},
  {
    timestamps: true
  });


// Hash the password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser, IUserModel>('User', UserSchema);
