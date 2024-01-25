import {Component} from "./base/Component";
import {ProductItem} from "./AppData"
// import {ILot, LotStatus} from "../../types";
import {bem, createElement, ensureElement/*, formatNumber*/} from "../utils/utils";
// import clsx from "clsx";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
    category: string;
    title: string;
    image?: string;
    price: number;
    description?: string | string[];
    // status: T;
}

export class Card<T> extends Component<ICard<T>> {
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _price: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._description = container.querySelector(`.${blockName}__text`);
        this._price = ensureElement<HTMLImageElement>(`.${blockName}__price`, container);
        this._button = container.querySelector(`.${blockName}__button`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    categoryColor(value: string): string {
        switch (value) {
            case 'софт-скил':
                return 'soft';
            case 'хард-скил':
                return 'hard';
            case 'кнопка':
                return 'button';
            case 'дополнительное':
                return 'additional';
            default :  // категория 'другое'
                return 'other'
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }
// ------------------------------------------------------
    set category(value: string) {
        this.setText(this._category, value);
        this.toggleClass(this._category, `card__category_${this.categoryColor(value)}`)
    }

    get category(): string {
        return this._category.textContent || '';
    }
// ------------------------------------------------------
    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }
// ------------------------------------------------------
    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }
// ------------------------------------------------------
    set description(value: string) {
        this.setText(this._description, value)
    }
// ------------------------------------------------------
    set price(value: number) {
        if (value) {
          this.setText(this._price, `${value} синапсов`)
        }else {
          this.setText(this._price, `Бесценно`)
        }
    }
}

export interface IBasketCard {
    title: string;
    price: number;
}

export class BasketCard extends Card<IBasketCard> {
    protected _itemIndex: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super('card-basket', container, actions);
        this._itemIndex = ensureElement<HTMLElement>(`.basket__item-index`, container);
        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._price = ensureElement<HTMLElement>(`.card__price`, container);
        this._button = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container);

        this._button.addEventListener('click', () => {
          //
        })
    }

    
}