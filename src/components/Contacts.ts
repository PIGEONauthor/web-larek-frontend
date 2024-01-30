// ▷▷▷ IMPORT
import {Form} from "./common/Form";
import {IEvents} from "./base/events";
import {IOrderForm, IActions} from "../types";
import {ensureElement, ensureAllElements} from "../utils/utils";

export class Contacts extends Form<IOrderForm> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) {
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

    getEmail() {
        return !!this._email.value
    }
    getPhone() {
        return !!this._phone.value
    }

}