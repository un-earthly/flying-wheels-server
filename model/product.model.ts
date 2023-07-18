import mongoose, { Schema } from 'mongoose';
import { IProduct, ProductCategory } from '../interface/product.interface';


const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantityInStock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: Object.values(ProductCategory), required: true
    },
    images: [{
        type: String
    }],
    specifications: {
        type: Map,
        of: String
    },
    bicycleType: {
        type: String
    },
    size: {
        type: Number
    },
    material: { type: String },
    brakeType: {
        type: String
    },
    minOrderQuantity: {
        type: Number,
        default: 1
    },
},
    { timestamps: true });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
