// ▷▷▷ IMPORT
import {Component} from "../base/Component";
import {EventEmitter} from "../base/events";
import {createElement, ensureElement} from "../../utils/utils";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    enable: number;
}

interface IFormActions {
    onClick: (event: MouseEvent) => void;
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter, actions?: IFormActions) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        this.items = [];
        
        if (actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set enable(length: number) {
        if (length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }

    set total(total: number) {
        this.setText(this._total, `${total} синапсов`);
    }
}