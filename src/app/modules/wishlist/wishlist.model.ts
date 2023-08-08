import { Schema, model } from 'mongoose';
import { IWishlist, IWishlistItem } from './wishlist.interface';

const wishlistItemSchema = new Schema<IWishlistItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const wishlistSchema = new Schema<IWishlist>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [wishlistItemSchema],
});

export const Wishlist = model<IWishlist>('Wishlist', wishlistSchema);
