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
    active: boolean;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    images: ProductImage[];
    detail: ProductDetail;
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
export interface ProductImage extends RaRecord {
    id: number;
    product: Product;
    image: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}
export interface ProductDetail extends RaRecord {
    id: number;
    product: Product;
    productSku: string;
    supplier: string;
    publishYear: string;
    author: string;
    origin: string;
    color: string;
    weight: string;
    size: string;
    quantityOfPage: number;
    description: string;
}
