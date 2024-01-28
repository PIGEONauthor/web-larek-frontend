import {Form} from "./common/Form";
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import {ensureElement, ensureAllElements} from "../utils/utils";

export type ButtonActions = {
    onClick: (event: MouseEvent) => void
}

export class Payment extends Form<IOrderForm> {
    protected _buttons: HTMLButtonElement[];
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents, actions?: ButtonActions) {
        super(container, events, actions);

        this._buttons = ensureAllElements<HTMLButtonElement>(`.button_alt`, container);
        this._address = this.container.querySelector(`.form__input`);

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

        // this._submit.addEventListener('click', () => {
        //     this.events.emit('contacts:open', this.events);
        // })
    }

    // set address(value: string) {
    //     this._address.value = value;
    // }

    set address(value: string) {
        this._address.value = value;
    }

    getAddress() {
        return !!this._address.value;
    }

    selected(name: string) {
        this._buttons.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === name);
        });
    }

    unselectAll() {
        this._buttons.forEach(button => {
            this.removeClass(button, 'button_alt-active');
        })
    }

    // выбран ли способ оплаты
    isSelected() {
        return (!!this.container.querySelector('.button_alt-active'));
    }

    getType() {
        const button = this.container.querySelector('.button_alt-active') as HTMLButtonElement;
        if (button.name === 'card') {
            return 'online';
        }else {
            return 'offline';
        }
    }

}