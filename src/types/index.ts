export type EventName = string | RegExp;
export type Subscriber = Function;
export type EmitterEvent = {
    eventName: string,
    data: unknown
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type ApiListResponse<Type> = {
    items: Type[]
    total: number,
};

export interface ILarekAPI {
    getProductList: () => Promise<IProductItem[]>;
    getProductItem: (id: string) => Promise<IProductItem>;
}

export interface IActions {
    onClick: () => void;
}

export interface ICard<T> {
    id: string;
    category?: string;
    title: string;
    image?: string;
    price: number;
    description?: string | string[];
    itemIndex: number;
    button: IProductItem[];
}

export interface IProductItem {
    id: string;
    category: string;
    title: string;
    description?: string;
    image?: string;
    price: number;
}

//export type IProduct = IProductItem /*& IAuction*/;

// export type LotUpdate = Pick<IProduct, 'id' | 'datetime' | 'status' | 'price' | 'history'>;

// export type IBasketItem = Pick<IProduct, 'id' | 'title' | 'price'> & {
//     isMyBid: boolean
// };

export interface IAppState {
    catalog: IProductItem[];
    basket: string[];
    preview: string | null;
    order: IOrderForm | null;
    loading: boolean;
}

export interface IOrderForm {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
    total?: number;
    items: string[];
}

// export interface IOrder extends IOrderForm {
//     // total: number;
//     // items: string[]
// }

export interface IOrder extends IOrderForm {
    items: string[]
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IOrderResult {
    id: string;
}

export interface ISuccess {
    description: number;
}