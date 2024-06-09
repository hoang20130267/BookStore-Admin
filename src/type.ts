import {RaRecord} from "react-admin";

export interface User extends RaRecord {
    id: number;
    username: string;
    email: string;
    userInfo: UserInfo;
    locked: boolean;
    isSocial: boolean;
}
export interface UserInfo extends RaRecord {
    id: number;
    fullName: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    avatar: string;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface Address extends RaRecord {
    id: number;
    user: User;
    fullName: string;
    hnumSname: string;
    wardCommune: string;
    provinceCity: string;
    districtId: number;
    wardCode: string;
    createdAt: string;
    updatedAt: string;
    isDefault: boolean;
    active: boolean;

}

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

export interface OrderStatus extends RaRecord{
    id: number;
    name: string;
}

export interface Order extends RaRecord {
    id: number;
    orderCode: string;
    user: User;
    address: Address;
    orderDate: string;
    orderTotal: number;
    totalQuantity: number;
    paymentMethod: string;
    status: OrderStatus;
    shippingCost: number;
    note: string;
    orderDetails: OrderDetail;
    promotion: Promotion;
}

export interface OrderDetail extends RaRecord {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    totalMoney: number;
}
export interface Promotion extends RaRecord {
    id: number;
    product: Product;
    code: string;
    discount: number;
    startDate: string;
    endDate: string;
    isCode: boolean;
}
