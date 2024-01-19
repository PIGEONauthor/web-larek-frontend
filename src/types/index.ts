export type EventName = string | RegExp;

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export interface IView<
  NodeType extends HTMLElement,
  DataType extends object,
  Events extends string,
  Modifiers
> {
  on(event: EventName): this;
  off(event: EventName): this;
  emit(): this;
  trigger(): void;
  bindEvent(sourceEvent: Events, targetEvent?: string, data?: object): this;
  render(data: DataType): NodeType;
  remove():  this;
  show(): this;
  hide(): this;
  setText(value: string): this;
  setLink(value: string): this;
  setValue(value: string): this;
  getValue(): string;
  isValid(): boolean;
  getValidationMessage(): string;
  addClass(className: string): this;
  removeClass(className: string): this;
  hasClass(className: string): boolean;
  append(element: HTMLElement): this;
  prepend(element: HTMLElement): this;
  bem(element?: string, modifier?: string): string;
  toggleMod(mods: Modifiers): this;
  factory(element: NodeType, data?: DataType, name?: string): any;
  clone(template: string, data?: DataType, name?: string): any;
  mount(selectorElement: HTMLElement | string, data?: any, name?: string): any;
}

export interface IAPI {
  baseUrl: string;
  options: RequestInit;

  get(uri: string): Promise<object>;
  post(uri: string, data: object, method: string): Promise<object>;
}

export interface IButton {
  label: string;
  events: 'click' | 'submit'
}

export type GalleryItem = IView<HTMLElement, object, 'click', string>;

export interface IGallery {
  items: GalleryItem[];

  setItems(items: IView<HTMLElement, object, 'click', string>[]): void;
}

export interface IModal {
  container: HTMLElement;
  content: HTMLElement;
  closeButton: HTMLButtonElement;

  setContent(): void;
  open(): void;
  close(): void;
  reset(): void;
}

export interface IForm {
  container: HTMLElement;
  submit: HTMLButtonElement;
  errors: HTMLElement;

  isValid(): boolean;
  setErrors(error: string): void;
}