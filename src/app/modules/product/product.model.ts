import { Schema, model } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';

const ProductSchema = new Schema<IProduct, IProductModel>(
  {

  }
);

export const Product = model<IProduct, IProductModel>('Product', ProductSchema);
