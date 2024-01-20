# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## ${\color{bisque}Установка \space и \space запуск}$
Для установки и запуска проекта необходимо выполнить команды

```cmd
npm install
npm run start
```

или

```cmd
yarn
yarn start
```
## ${\color{bisque}Сборка}$

```cmd
npm run build
```

или

```cmd
yarn build
```
## ${\color{bisque}Архитектура}$

${\color{red}  !!!\space В \space ПРОЦЕССЕ \space РАЗРАБОТКИ \space ПРИВЕДЕННАЯ \space НИЖЕ \space АРХИТЕКТУРА \space МОЖЕТ \space ПОНЕСТИ \space ИЗМЕНЕНИЯ  }$
${\color{red}  КАК \space В \space ИНТЕРФЕЙСАХ \space ОПИСАНИЯ \space КЛАССОВ \space И \space В \space ТИПАХ \space ДАННЫХ,\space ДЛЯ \space ОПИСАНИЯ  }$
${\color{red}  ЭТИХ \space КЛАССОВ, ТАК \space И \space В \space СПОСОБАХ \space РЕАЛИЗАЦИИ \space ДАННОГО \space ПРОЕКТА \space !!!  }$

![UML_web-larek (4)](https://github.com/PIGEONauthor/web-larek-frontend/assets/137702509/f6749a82-822b-4b9c-a38a-952f6150ddd8)

[//]: <> (---------------------------БАЗОВЫЙ_КОД---------------------------)

## ${\color{bisque}Базовый \space код}$

${\color{bisque}  1)  }$ Класс ```EventEmitter```<br>
<i>обеспечивает работу событий.</i>

 - установка и снятие слушателей событий;
 - вызов слушателей при возникновении события;
 - возможность привязать контекст к другому брокеру

${\color{bisque}  2)  }$ Класс ```View```<br>
<i>обеспечивает реализацию всех компонентов.</i>
 - наследует методы EventEmitter (устанавливает события для конкретных HTML-элементов);
 - возможность отобразить HTML-элемент на странице или убрать его;
 - возможность скрыть и показать HTML-элемент;
 - установка значения в атрибуты HTML-элементов;
 - возможность считать введенные значения из инпутов;
 - включение и отключение взаимодействия с интерактивными элементами (кнопки);
 - проверка вводимыч данныч на валидность, вывод сообщения валидации;
 - добавление и удаление значения CSS-классов для HTML-элементов;
 - возможность добавлять контент в начало или в конец HTML-элемента, заменять контент внутри;
 - возможность кэшировать DOM-элементы, находящиеся внутри компонента;
 - копирование DOM-элементов, находящиеся внутри компонента;
 - стилизация компонентов по BEM;
 - клонирование шаблонных элементов;
 - вставка DOM-элементов в компонент.

${\color{bisque}  3)  }$ Класс ```API```<br>
<i>обеспечивает работу с данными сервера.</i>

 - возможность отправлять GET и POST-запросы

[//]: <> (---------------------------ХРАНИЛИЩА---------------------------)

## ${\color{bisque} Компоненты \space модели \space данных \space(хранение \space данных) }$

${\color{bisque}  1)  }$ Класс ```CardsData```<br>
<i>обеспечивает хранение данных о продаваемых продуктах</i>.

свойства:
 - <b>cards</b> - массив ключ/значение, где ключем является id-продукта, а значением - объект с данными продукта.

методы:
 - <b>addCard</b> - добавляет продукт в хранилище;
 - <b>getCard</b> - достает из хранилища данные продукта;
 - <b>getCards</b> - получить весь список объектов с данными продуктов.

${\color{bisque}  2)  }$ Класс ```BusketData```<br>
<i>обеспечивает хранение информмации о заказах, добавленных в корзину</i>.

свойства:
 - <b>orders</b> - массив объектов с данными заказов.

методы:
 - <b>addOrder</b> - добавить заказ в хранилище;
 - <b>getOrders</b> - получить весь список заказов;
 - <b>getCount</b> - получить количество заказов.

[//]: <> (---------------------------КОМПОНЕНТЫ_ПРЕДСТАВЛЕНИЯ---------------------------)

## ${\color{bisque}Компоненты \space представления}$

[//]: <> (---------------------------1_BUTTON---------------------------)

${\color{bisque}  1)  }$ Класс ```Button```<br>
<i>посторяющийся компонент кнопки</i>

свойства:
 - <b>label</b> - текст кнопки

методы:
 - <b>setLabel</b> - установка текста на кнопку;
 - <b>enable</b> - сделать активной;
 - <b>disable</b> - сделать неактивной.

[//]: <> (---------------------------2_MODAL---------------------------)

${\color{bisque}  2)  }$ Класс ```Modal```<br>
<i>обеспечивает работу модальных окон.</i>

свойства:
 - <b>container</b> - DOM-элемент модального окна;
 - <b>content</b> - контент для наполения модального окна;
 - <b>closeButton</b> -  кнопка, закрывающая модальное окно.
 
методы:
 - <b>setContent</b> - установка контента;
 - <b>open</b> - открытие модального окна;
 - <b>close</b> - закрытие модального окна;
 - <b>reset</b> - сброс состояния внутренних компонентов модального окна;

[//]: <> (---------------------------3_FORM---------------------------)

${\color{bisque}  3)  }$ Класс ```Form```<br>
<i>обеспечивает работу форм.</i>

свойства:
 - <b>container</b> - DOM-элемент модального окна;
 - <b>submit</b> - кнопка для подтверждения формы;
 - <b>errors</b> - DOM-элемент для вставки ошибок валидации.

методы:
 - <b>isValid</b> - валидация инпутов;
 - <b>setErrors</b> - установка ошибки;
 - <b>accept</b> - подтверждение формы.

[//]: <> (---------------------------4_GALLERY---------------------------)

${\color{bisque}  4)  }$ Класс ```Gallery```<br>
<i>генерация галереи с карточками</i>

свойства:
 - <b>items</b> - содержит массив HTML-элементов с карточками.

методы:
 - <b>setItems</b> - добавление элементов в список галлереи.

[//]: <> (---------------------------5_PAGE---------------------------)

${\color{bisque}  5)  }$ Класс ```Page```<br>
<i>компонент реализации страницы приложения</i>

свойства:
 - <b>counter</b> - счетчика заказов в корзине;
 - <b>gallery</b> - список элементов галлереи.

методы:
 - <b>lockScroll</b> - блокирует прокрутку при открытии модального окна;
 - <b>openBusket</b> - открывает модальное окно корзины.

[//]: <> (---------------------------6_CARD---------------------------)

${\color{bisque}  6)  }$ Класс ```Card```<br>
<i>реализует карточку товара с выводом краткой информации</i>

свойства:
 - <b>id</b> - поле для хранения ID-карточки;
 - <b>category</b> - содержит кадегорию товара;
 - <b>title</b> - содержит заголовок карточки товара;
 - <b>image</b> - содержит изобрадение для карточки товара;
 - <b>price</b> - содержит цену товара.

методы:
 - <b>setImage</b> - установка изображения в карточку;
 - <b>setTitle</b> - установка заголовка;
 - <b>setCategory</b> - установка категрории товара;
 - <b>setPrise</b> - установка цены товара;
 - <b>openModal</b> - открывает модальное окно с подробным описанием товара (передает ID-карточки для заполнения данными из хранилища).

[//]: <> (---------------------------7_PRODUCT---------------------------)

${\color{bisque}  7)  }$ Класс ```Product```<br>
<i>реализует контент для модального окна с подробным описанием товара, наследует свойства и методы от интерфейса карточки, дополняя его.</i>

свойства:
 - <b>description</b> - описание товара;

методы:
 - <b>setDescription</b> - установить описания товара;
 - <b>addToBusket</b> - добавить товар в корзину (хранилище заказов);
 - <b>openBusket</b> - открыть модальное окно корзины.

[//]: <> (---------------------------8_BASKET---------------------------)

${\color{bisque}  8)  }$ Класс ```Basket```<br>
<i>реализует контент для модального окна корзины</i>

свойства:
 - <b>title</b> - заголовок;
 - <b>orderList</b> - список товаров в заказе;
 - <b>button</b> - кнопка для перехода к оформлению;
 - <b>total</b> - итоговая стоимость заказа.

методы:
 - <b>setTitle</b> - установка заголовка;
 - <b>setOrders</b> - вывод списка товаров в заказе;
 - <b>remove</b> - убрать товар из заказа;
 - <b>getSum</b> - посчитать итоговую сумму заказа;
 - <b>accept</b> - при подтверждении заказа закрывается и открывает модальное окно с Оплатой.

[//]: <> (---------------------------9_PAYMENT---------------------------)

${\color{bisque}  9)  }$ Класс ```Payment```<br>
<i>реализует контент для модального окна с оплатой</i>

свойства:
 - <b>title</b> - содержит заголовок;
 - <b>formContent</b> - контент формы для оплаты;
 - <b>button</b> - кнопка для перехода к модальному окну с вводом контактных данных.

методы:
 - <b>getAddress</b> - получение адреса из инпута;
 - <b>isValide</b> - проверка на валидность;
 - <b>getValidationMessage</b> - получение сообщения валидации;
 - <b>accept</b> - при подтверждении окно оплаты закрывается и открывает модальное окно с вводом контактных данных;

[//]: <> (---------------------------10_USERDATA---------------------------)

${\color{bisque}  10)  }$ Класс ```UserData```<br>
<i>реализует контент для модального окна с вводом контактных данных</i>

свойства:
 - <b>title</b> - содержит заголовок;
 - <b>formContent</b> - контент формы для контактных данных;

методы:
 - <b>getValue</b> - получение данных из инпутов;
 - <b>isValid</b> - проверка на валидность;
 - <b>getValidationMessage</b> - получение сообщения валидации;
 - <b>accept</b> - при подтверждении формы окно закрывается и открывает модальное окно с успешным выполнением;

[//]: <> (---------------------------11_SUCCESS---------------------------)

${\color{bisque}  11)  }$ Класс ```Success```<br>
<i>реализует контент для модального окна с уведомлениео об успешно оформленном заказе</i>

свойства:
 - <b>image</b> - содержит изображение;
 - <b>description</b> - содержит описание;
 - <b>button</b> - кнопка для подтверждения и закрытия окна;

методы:
 - <b>setImage</b> - установка изображения;
 - <b>setDescription</b> - установка описания;
 - <b>accept</b> - при подтверждении форма закрывается;

[//]: <> (---------------------------КЛЮЧЕВЫЕ_ТИПЫ_ДАННЫХ---------------------------)

## ${\color{bisque}  Ключевые \space типы \space данных  }$

```TypeScript
//------------------------------EVENT EMITTER------------------------------

export type EventName = string | RegExp;

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

//------------------------------VIEW------------------------------

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

//------------------------------API------------------------------

export interface IAPI {
  baseUrl: string;
  options: RequestInit;

  get(uri: string): Promise<object>;
  post(uri: string, data: object, method: string): Promise<object>;
}

//------------------------------BUTTON------------------------------

export interface IButton {
  label: string;
  events: 'click' | 'submit';

  setLabel(label: string): void;
  enable(): void;
  disable(): void;
}

//------------------------------MODAL------------------------------

export interface IModal {
  container: HTMLElement;
  content: HTMLElement;
  closeButton: HTMLButtonElement;

  setContent(): void;
  open(): void;
  close(): void;
  reset(): void;
}

//------------------------------FORM------------------------------

export interface IForm {
  container: HTMLElement;
  submit: HTMLButtonElement;
  errors: HTMLElement;

  isValid(): boolean;
  setErrors(error: string): void;
}

//------------------------------CARD DATA------------------------------

export type CardData = {
  description: string;
  image: string;
  title: string;
  category: string;
  price: string | number
};

export type CardID = string;

export interface ICardsData {
  cards: Map<CardID, CardData>

  addCard(id: CardID, data: CardData): void;
  getCard(id: CardID): CardData;
  getCards(): CardData[];
}

//------------------------------BUSKET DATA------------------------------

export type Order = {
  number: number;
  title: string;
  price: string
}

export interface IBusketData {
  orders: Order[];

  addOrder(order: Order): void;
  getOrders(): Order[];
  getCount(): number;
}

//------------------------------GALLERY------------------------------

export type GalleryItem = IView<HTMLElement, object, 'click', string>;

export interface IGallery {
  items: GalleryItem[];

  setItems(items: IView<HTMLElement, object, 'click', string>[]): void;
}

//------------------------------PAGE------------------------------

export interface IPage {
  counter: number;
  gallery: GalleryItem[];

  lockScroll(): void;
  openBusket(): void
}

//------------------------------CARD------------------------------

export interface ICard {
  id: string;
  category: string;
  title: string;
  image: string;
  price: string;

  setImage(link: string): void;
  setTitle(text: string): void;
  setCategory(category: string): void;
  setPrice(price: string): void;
  openModal(modal: HTMLElement, id: string): void
}

//------------------------------PRODUCT------------------------------

export interface IProduct extends ICard {
  description: string;

  setDescription(text: string): void;
  addToBasket(): void;
  openBasket(): void;
}

//------------------------------BUSKET------------------------------

export interface IBusket {
  title: string;
  ordersList: HTMLElement[];
  button: HTMLButtonElement;
  total: string;

  setTitle(title: string): void;
  setOrders(orders: HTMLElement[]): void;
  remove(order: HTMLElement): void;
  getSum(): string;
  accept(): void;
}

//------------------------------PAYMENT------------------------------

export interface IPayment {
  title: string;
  formContent: HTMLElement;
  button: HTMLButtonElement;

  getAddress(addr: HTMLInputElement): string;
  isValide(): boolean;
  getValidationMessage(): string;
  accept(): void
}

//------------------------------USERDATA------------------------------

export interface IUserData {
  title: string;
  formContent: HTMLElement;

  getValue(value: HTMLInputElement): string;
  isValid(): boolean;
  getValidationMessage(): string;
  accept(): void
}

//------------------------------SUCCESS------------------------------

export interface ISuccess {
  image: string;
  description: string;
  button: HTMLButtonElement;

  setImage(link: string): void;
  setDescription(text: string): void;
  accept(): void
}
```
