// ▷▷▷ IMPORT
import { IEvents } from "./base/events";
import {FormErrors,  IOrder, IOrderForm, IProductItem} from "../types";

export class ProductItem implements IProductItem{
    id: string;
    category: string;
    title: string;
    description?: string;
    image?: string;
    price: number;

    constructor(item: object, protected events: IEvents) {
      Object.assign(this, item);
    }

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
}

export class AppState {
    basket: ProductItem[] = [];
    catalog: ProductItem[];
    loading: boolean;
    order: IOrder = {
        payment: '',
        email: '-',
        phone: '-',
        address: '',
        total: 0,
        items: []
    };
    preview: string | null;
    formErrors: FormErrors = {};

  constructor (item: object, protected events: IEvents) {}

    emitChanges(event: string, payload?: object) {
        // Состав данных можно модифицировать
        this.events.emit(event, payload ?? {});
    }

    getTotal(): number {
        return this.basket.reduce((a, b) => { return a + b.price }, 0)
    }

    setCatalog(items: IProductItem[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setBasket(item: ProductItem) {
        this.basket.push(item);
        this.emitChanges('basket:changed');
    }

    removeBasket(item: ProductItem) {
        this.basket = this.basket.filter(el => el.id != item.id);
        this.emitChanges('basket:changed');
    }

    clearBasket() {
        this.basket = [];
        this.order.items = [];
    }

    setPreview(item: ProductItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    setOrderField(field: keyof IOrderForm, value: string | number ) {
        if (field === 'total') {
            this.order[field] = value as number;
        }else if (field === 'items') {
            const arr = this.order[field];
            arr.push(value as string);
        }else {
            this.order[field] = value as string;
        }

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Неоходимо указать адрес';
        }
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