// ▷▷▷ IMPORT
import { ISuccess, IActions } from "../types";
import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";

export class Success extends Component<ISuccess> {
    protected _description: HTMLElement;
    protected _close: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IActions) {
        super(container);

        this._description = ensureElement<HTMLElement>(`.order-success__description`, this.container);
        this._close = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set description(value: number) {
        this.setText(this._description, `Списано ${value} синапсов`);
    }
}