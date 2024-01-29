// ▷▷▷ IMPORT
import { Form } from "./common/Form";
import { IEvents } from "./base/events";
import { IOrderForm, IActions } from "../types";
import { ensureElement, ensureAllElements } from "../utils/utils";

export class Payment extends Form<IOrderForm> {
    protected _buttons: HTMLButtonElement[];
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) {
        super(container, events, actions);

        this._buttons = ensureAllElements<HTMLButtonElement>(`.button_alt`, container);
        this._address = ensureElement<HTMLInputElement>(`.form__input`, container);

        this._buttons.forEach(button => {
            button.addEventListener('click', (evt) => {
                const target = evt.target as HTMLButtonElement;
                this.selected(target.name);
                this.events.emit('payment:changed');
            })
        })

        this._address.addEventListener('input', (evt) => {
            this.events.emit('payment:changed');
        })
    }
    // проверка, заполнено ли поле адреса
    getAddress() {
        return !!this._address.value;
    }

    selected(name: string) {
        this._buttons.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === name);
        });
    }
    // убрать выборку со способов оплаты
    unselectAll() {
        this._buttons.forEach(button => {
            this.removeClass(button, 'button_alt-active');
        })
    }
    // проверка, выбран ли способ оплаты
    isSelected() {
        return (!!this.container.querySelector('.button_alt-active'));
    }
    // получить способ оплаты
    getType() {
        const button = this.container.querySelector('.button_alt-active') as HTMLButtonElement;
        if (button.name === 'card') {
            return 'online';
        }else {
            return 'offline';
        }
    }

}