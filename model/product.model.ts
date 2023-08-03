import mongoose, { Schema } from 'mongoose';
import { IBulkPricing, IProduct, ProductCategory } from '../interface/product.interface';

const bulkPricingSchema = new Schema<IBulkPricing>({
    minQuantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
});
const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    specifications: {
        type: Schema.Types.Mixed
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: Object.values(ProductCategory),
        required: true
    },
    images: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    bulkPricing: [bulkPricingSchema],
    minimumOrderQuantity: {
        type: Number,
        default: 100
    },
}, {
    timestamps: true
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
