import { Document } from "mongoose";
export enum ProductCategory {
    MOUNTAIN_BIKE = 'Mountain Bike',
    ROAD_BIKE = 'Road Bike',
    HYBRID_BIKE = 'Hybrid Bike',
    CRUISER_BIKE = 'Cruiser Bike',
    WHEEL = 'Wheel',
    TIRE = 'Tire',
    RIM = 'Rim',
    DISK = 'Disk',
}

export interface IBulkPricing {
    minQuantity: number;
    pricePerUnit: number;
}
export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    specifications: Record<string, string>;
    price: number;
    quantity: number;
    category: ProductCategory;
    images: string[];
    isActive: boolean;
    reviews: string[];
    bulkPricing: IBulkPricing[];
    minimumOrderQuantity: number;
}