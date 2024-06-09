import { Identifier, RaRecord } from 'react-admin';

export interface Category extends RaRecord {
    name: string;
}

export interface Customer extends RaRecord {
    username: string;
    email: string;
    fullName: string;
    phone: string;
    gender: string;
    dateOfBirth: Date;
    avatar: string;
    role: number;
    locked: boolean;
    isSocial: boolean;
}

export type OrderStatus = 'ordered' | 'delivered' | 'cancelled';

export interface Order extends RaRecord {
    status: OrderStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
    total_ex_taxes: number;
    delivery_fees: number;
    tax_rate: number;
    taxes: number;
    customer_id: Identifier;
    reference: string;
}

export type BasketItem = {
    product_id: Identifier;
    quantity: number;
};

export interface Review extends RaRecord {
    user: Customer;
    rating: number;
    cmtDetail: String;
    created_at: Date;
    updated_at: Date;
}

declare global {
    interface Window {
        restServer: any;
    }
}