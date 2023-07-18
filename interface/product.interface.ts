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
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    quantityInStock: number;
    category: ProductCategory;
    images: string[];
    specifications: Record<string, string>;
    bicycleType?: string;
    size?: number;
    material?: string;
    brakeType?: string;
    minOrderQuantity: number;
}
