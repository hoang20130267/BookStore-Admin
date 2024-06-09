import { RaRecord } from 'react-admin';

export interface Category extends RaRecord {
    name: string;
}

export interface UserInfor extends RaRecord{
    fullName: string;
    phone: string;
    gender: string;
    dateOfBirth: Date;
    avatar: string;
}

export interface Role extends RaRecord {
    description: string;
}
export interface User extends RaRecord {
    username: string;
    email: string;
    userInfo: UserInfor;
    role: Role;
    locked: boolean;
    isSocial: boolean;
}

export interface OrderStatus extends RaRecord {
    name: string;
    slug: string;
}

export interface Order extends RaRecord {
    orderCode: string;
    status: OrderStatus;
    user: User;
    orderDate: Date;
    orderTotal: number;
    totalQuantity: number;
    paymentMethod: String;
    shippingCost: number;
    note: String;
    orderDetails: OrderDetail;
    promotion: string;
}

export interface OrderDetail extends RaRecord {
    order: Order;
    product: Product[];
    quantity: number;
    totalMoney: number;
}

export interface Product extends RaRecord {
    title: string;
    currentPrice: number;
    quantity: number;
    description: string;
    image: string;
    active : boolean;
    detail : ProductDetail;
}

export interface ProductDetail extends RaRecord {
    productSku: String;
    supplier: string;
    publisher: string;
    publishYear: string;
    author: string;
    weight: number;
    size: string;
    quantityOfPage: number;
    description: string;
}

export interface Comment extends RaRecord {
    user: User;
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