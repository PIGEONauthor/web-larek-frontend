import {Form} from "./common/Form";
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import {ensureElement, ensureAllElements} from "../utils/utils";

export type ButtonActions = {
    onClick: (event: MouseEvent) => void
}

export class Contacts extends Form<IOrderForm> {
    // protected _buttons: HTMLButtonElement[];
    protected _submitButton: HTMLElement;
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents, actions?: ButtonActions) {
        super(container, events, actions);

        this._email = this.container.elements.namedItem('email') as HTMLInputElement;
        this._phone = this.container.elements.namedItem('phone') as HTMLInputElement;

        this._email.addEventListener('input', () => {
            this.events.emit('contacts:changed', this._errors);
        })
        this._phone.addEventListener('input', () => {
            this.events.emit('contacts:changed', this._errors);
        })
    }

    set email(value: string) {
        this._email.value = value;
    }
    
    set phone(value: string) {
        this._phone.value = value;
    }

    getEmail() {
        return !!this._email.value
    }
    getPhone() {
        return !!this._phone.value
    }

}