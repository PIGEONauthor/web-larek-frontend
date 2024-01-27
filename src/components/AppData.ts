// import _ from "lodash";
// import {dayjs, formatNumber} from "../utils/utils";

import {Model} from "./base/Model";
import {FormErrors, IAppState, /*IBasketItem, IProduct,*/ IOrder, IOrderForm,/*, LotStatus*/
IProductItem} from "../types";
import { IEvents } from "./base/events";

export type CatalogChangeEvent = {
    catalog: ProductItem[]
};

export class ProductItem {
    id: string;
    category: string;
    title: string;
    description?: string;
    image?: string;
    price: number;
    // status: LotStatus;

    constructor(item: object, protected events: IEvents) {
      Object.assign(this, item);
    }

    // protected myLastBid: number = 0;

    // clearBid() {
    //     this.myLastBid = 0;
    // }

    // placeBid(price: number): void {
    //     this.price = price;
    //     this.history = [...this.history.slice(1), price];
    //     this.myLastBid = price;

    //     if (price > (this.minPrice * 10)) {
    //         this.status = 'closed';
    //     }
    //     this.emitChanges('auction:changed', { id: this.id, price });
    // }

    // get isMyBid(): boolean {
    //     return this.myLastBid === this.price;
    // }

    // get isParticipate(): boolean {
    //     return this.myLastBid !== 0;
    // }

    // get statusLabel(): string {
    //     switch (this.status) {
    //         case "active":
    //             return `Открыто до ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
    //         case "closed":
    //             return `Закрыто ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
    //         case "wait":
    //             return `Откроется ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
    //         default:
    //             return this.status;
    //     }
    // }

    get categoryColor(): string {
        switch (this.category) {
            case 'софт-скил':
                return '_soft';
            case 'хард-скил':
                return '_hard';
            case 'кнопка':
                return '_button';
            case 'дополнительное':
                return '_additional';
            default:  // категория 'другое'
                return '_other;'
        }
    }

    get getId(): string {
        return this.id;
    }

    // get timeStatus(): string {
    //     if (this.status === 'closed') return 'Аукцион завершен';
    //     else return dayjs
    //         .duration(dayjs(this.datetime).valueOf() - Date.now())
    //         .format('D[д] H[ч] m[ мин] s[ сек]');
    // }

    // get auctionStatus(): string {
    //     switch (this.status) {
    //         case 'closed':
    //             return `Продано за ${formatNumber(this.price)}₽`;
    //         case 'wait':
    //             return 'До начала аукциона';
    //         case 'active':
    //             return 'До закрытия лота';
    //         default:
    //             return '';
    //     }
    // }

    // get nextBid(): number {
    //     return Math.floor(this.price * 1.1);
    // }
}

export class AppState {
    // basket: string[];
    basket: ProductItem[] = [];
    catalog: ProductItem[];
    loading: boolean;
    order: IOrder = {
        email: '',
        phone: '',
        address: '',
        items: []
    };
    preview: string | null;
    formErrors: FormErrors = {};
    //events: IEvents;

  constructor (item: object, protected events: IEvents) {}

    // toggleOrderedLot(id: string, isIncluded: boolean) {
    //     if (isIncluded) {
    //         this.order.items = _.uniq([...this.order.items, id]);
    //     } else {
    //         this.order.items = _.without(this.order.items, id);
    //     }
    // }

    // clearBasket() {
    //     this.order.items.forEach(id => {
    //         this.toggleOrderedLot(id, false);
    //         this.catalog.find(it => it.id === id).clearBid();
    //     });
    // }

    emitChanges(event: string, payload?: object) {
        // Состав данных можно модифицировать
        this.events.emit(event, payload ?? {});
    }

    getTotal(): number {
        // return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
        return this.basket.reduce((a, b) => { return a + b.price }, 0)
    }

    setCatalog(items: IProductItem[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setBasket(item: ProductItem) {
        // const basketItem = new ProductItem(item, this.events);
        this.basket.push(item);
        this.emitChanges('basket:changed');
    }

    removeBasket(item: ProductItem) {
        this.basket = this.basket.filter(el => el.id != item.id);
        this.emitChanges('basket:changed');
    }

    setPreview(item: ProductItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    // getActiveLots(): ProductItem[] {
    //     return this.catalog
    //         .filter(item => item.status === 'active' && item.isParticipate);
    // }

    // getClosedLots(): ProductItem[] {
    //     return this.catalog
    //         .filter(item => item.status === 'closed' && item.isMyBid)
    // }

    setOrderField(field: keyof IOrderForm, value: string) {
        this.order[field] = value;

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}