import {RaRecord} from "react-admin";

export interface Category extends RaRecord {
    id: number;
    name: string;
    parentCategory: Category | null;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    active: boolean;
}

export interface Product extends RaRecord {
    id: number;
    category: Category;
    title: string;
    image: string;
    oldPrice: number;
    currentPrice: number;
    onSale: boolean;
}

export interface Inventory extends RaRecord {
    id: number;
    product: Product;
    importPrice: number;
    quantity: number;
    createdAt: string;
}


export interface InventoryRequest {
    productId: number,
    importPrice: number,
    salePrice: number,
    quantity: number,
    createdAt: string,
}