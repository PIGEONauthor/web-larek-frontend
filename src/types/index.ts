// export type LotStatus = 'wait' | 'active' | 'closed';

// export interface IAuction {
//     status: LotStatus;
//     datetime: string;
//     price: number;
//     minPrice: number;
//     history?: number[];
// }

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
    total?: string;
}

export interface IOrder extends IOrderForm {
    items: string[]
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

// export interface IBid {
//     price: number
// }

export interface IOrderResult {
    id: string;
}

// //------------------------------EVENT EMITTER------------------------------

// export type EventName = string | RegExp;

// export interface IEvents {
//   on<T extends object>(event: EventName, callback: (data: T) => void): void;
//   emit<T extends object>(event: string, data?: T): void;
//   trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
// }

// //------------------------------VIEW------------------------------

// export interface IView<
//   NodeType extends HTMLElement,
//   DataType extends object,
//   Events extends string,
//   Modifiers
// > {
//   on(event: EventName): this;
//   off(event: EventName): this;
//   emit(): this;
//   trigger(): void;
//   bindEvent(sourceEvent: Events, targetEvent?: string, data?: object): this;
//   render(data: DataType): NodeType;
//   remove():  this;
//   show(): this;
//   hide(): this;
//   setText(value: string): this;
//   setLink(value: string): this;
//   setValue(value: string): this;
//   getValue(): string;
//   isValid(): boolean;
//   getValidationMessage(): string;
//   addClass(className: string): this;
//   removeClass(className: string): this;
//   hasClass(className: string): boolean;
//   append(element: HTMLElement): this;
//   prepend(element: HTMLElement): this;
//   bem(element?: string, modifier?: string): string;
//   toggleMod(mods: Modifiers): this;
//   factory(element: NodeType, data?: DataType, name?: string): any;
//   clone(template: string, data?: DataType, name?: string): any;
//   mount(selectorElement: HTMLElement | string, data?: any, name?: string): any;
// }

// //------------------------------API------------------------------

// export interface IAPI {
//   baseUrl: string;
//   options: RequestInit;

//   get(uri: string): Promise<object>;
//   post(uri: string, data: object, method: string): Promise<object>;
// }

// //------------------------------BUTTON------------------------------

// export interface IButton {
//   label: string;
//   events: 'click' | 'submit';

//   setLabel(label: string): void;
//   enable(): void;
//   disable(): void;
// }

// //------------------------------MODAL------------------------------

// export interface IModal {
//   container: HTMLElement;
//   content: HTMLElement;
//   closeButton: HTMLButtonElement;

//   setContent(): void;
//   open(): void;
//   close(): void;
//   reset(): void;
// }

// //------------------------------FORM------------------------------

// export interface IForm {
//   container: HTMLElement;
//   submit: HTMLButtonElement;
//   errors: HTMLElement;

//   isValid(): boolean;
//   setErrors(error: string): void;
// }

// //------------------------------CARD DATA------------------------------

// export type CardData = {
//   description: string;
//   image: string;
//   title: string;
//   category: string;
//   price: string | number
// };

// export type CardID = string;

// export interface ICardsData {
//   cards: Map<CardID, CardData>

//   addCard(id: CardID, data: CardData): void;
//   getCard(id: CardID): CardData;
//   getCards(): CardData[];
// }

// //------------------------------BUSKET DATA------------------------------

// export type Order = {
//   number: number;
//   title: string;
//   price: string
// }

// export interface IBusketData {
//   orders: Order[];

//   addOrder(order: Order): void;
//   getOrders(): Order[];
//   getCount(): number;
// }

// //------------------------------GALLERY------------------------------

// export type GalleryItem = IView<HTMLElement, object, 'click', string>;

// export interface IGallery {
//   items: GalleryItem[];

//   setItems(items: IView<HTMLElement, object, 'click', string>[]): void;
// }

// //------------------------------PAGE------------------------------

// export interface IPage {
//   counter: number;
//   gallery: GalleryItem[];

//   lockScroll(): void;
//   openBusket(): void
// }

// //------------------------------CARD------------------------------

// export interface ICard {
//   id: string;
//   category: string;
//   title: string;
//   image: string;
//   price: string;

//   setImage(link: string): void;
//   setTitle(text: string): void;
//   setCategory(category: string): void;
//   setPrice(price: string): void;
//   openModal(modal: HTMLElement, id: string): void
// }

// //------------------------------PRODUCT------------------------------

// export interface IProduct extends ICard {
//   description: string;

//   setDescription(text: string): void;
//   addToBasket(): void;
//   openBasket(): void;
// }

// //------------------------------BUSKET------------------------------

// export interface IBusket {
//   title: string;
//   ordersList: HTMLElement[];
//   button: HTMLButtonElement;
//   total: string;

//   setTitle(title: string): void;
//   setOrders(orders: HTMLElement[]): void;
//   remove(order: HTMLElement): void;
//   getSum(): string;
//   accept(): void;
// }

// //------------------------------PAYMENT------------------------------

// export interface IPayment {
//   title: string;
//   formContent: HTMLElement;
//   button: HTMLButtonElement;

//   getAddress(addr: HTMLInputElement): string;
//   isValide(): boolean;
//   getValidationMessage(): string;
//   accept(): void
// }

// //------------------------------USERDATA------------------------------

// export interface IUserData {
//   title: string;
//   formContent: HTMLElement;

//   getValue(value: HTMLInputElement): string;
//   isValid(): boolean;
//   getValidationMessage(): string;
//   accept(): void
// }

// //------------------------------SUCCESS------------------------------

// export interface ISuccess {
//   image: string;
//   description: string;
//   button: HTMLButtonElement;

//   setImage(link: string): void;
//   setDescription(text: string): void;
//   accept(): void
// }