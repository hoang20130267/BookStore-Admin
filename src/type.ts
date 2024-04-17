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

export interface Product extends RaRecord{
    id: number;
    category: Category;
    title: string;
    image: string;
    old_price: number;
    current_price: number;
    on_sale: boolean;

    
}