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

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура

![UML_web-larek (3)](https://github.com/PIGEONauthor/web-larek-frontend/assets/137702509/31831ae2-ab09-428b-8fec-ebbeebb87214)

## Базовый код

1) Класс ```EventEmitter```<br>
<i>обеспечивает работу событий.</i>

 - установка и снятие слушателей событий;
 - вызов слушателей при возникновении события;
 - возможность привязать контекст к другому брокеру

3) Класс ```View```<br>
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

4) Класс ```API```<br>
<i>обеспечивает работу с данными сервера.</i>

 - возможность отправлять GET и POST-запросы

## Компоненты модели данных

1) Класс ```Button```

 - установка текста на кнопку;
 - сделать активной/неактивной.

2) Класс ```Gallery```

 - добавление элементов в список галлереи;
 - активация выбираемого элемента;

3) Класс ```Modal``` обеспечивает работу модальных окон.

 - установка контента;
 - открытие и закрытие модального окна;
 - сброс состояния внутренних компонентов модального окна;

4) Класс ```Form```

 - валидация инпутов
 - подтверждение формы

## Компоненты представления

1) Класс ```Card```
 - устанавливает в карточку необходимый контент;
 - открывает модальное окно по клику.

2) Класс ```Product```
 - устанавливает в контейнер необходимый контент;
 - добавляет продукт в корзину.

4) Класс ```Basket```
 - устанавливает контент для модального окна "Корзина";
 - при подтверждении заказа закрывается и открывает модальное окно с Оплатой.

5) Класс ```Payment```
- устанавливает контент для модального окна "Способ оплаты";
- проверяет валидность данных;
- при подтверждении формы закрывается и открывает модальное оено с данными пользователя.

6) Класс ```UserData```
- устанавливает контент для модального окна "Данные пользователя";
- проверяет валидность данных;
- при подтверждении формы закрывается и открывает модальное оено с успешным выполнением.

7) Класс ```Success```
устанавливает контент для модального окна "Заказ оформлен!"

## Ключевые типы данных

```
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

// интерфейс базового компонента "кнопка"
interface IButton {
  label: string;
  events: 'click' | 'submit'
}

// интерфейс базового компонента "галерея"
interface IGallery {
  items: GalleryItem[];

  setItems(items: IView<HTMLElement, object, 'click', string>[]): void;
}

type GalleryItem = View<HTMLElement, object, 'click', string> | HTMLCustomItem<HTMLElement, 'click'>;

// интерфейс модального окна
interface IModal {
  container: HTMLElement;
  content: HTMLElement;
  closeButton: HTMLButtonElement;

  setContent(): void;
  open(): void;
  close(): void;
  reset(): void;
}

// интерфейс формы
interface IForm {
  container: HTMLElement;
  submit: HTMLButtonElement;
  errors: HTMLElement;

  isValid(): boolean;
  setErrors(error: string): void;
}
```
