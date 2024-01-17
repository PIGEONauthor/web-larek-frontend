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

![UML_web-larek (1)](https://github.com/PIGEONauthor/web-larek-frontend/assets/137702509/5b9c6072-24b1-46ac-be48-f891154086e0)

## Базовый код

1) Класс ```EventEmitter```<br>
<i>обеспечивает работу событий.</i>

 - установка и снятие слушателей событий;
 - вызов слушателей при возникновении события;
 - возможность привязать контекст к другому брокеру

3) Класс ```HTMLItemAPI```<br>
<i>обеспечивает реализацию всех компонентов (наследуется от EventEmitter).</i>

 - наследует методы EventEmitter (устанавливает события для конкретных HTML-элементов);
 - возможность отобразить HTML-элемент на странице или убрать его;
 - возможность скрыть и показать HTML-элемент;
 - установка значения в атрибуты HTML-элементов;
 - возможность считать введенные значения из инпутов;
 - включение и отключение взаимодействия с интерактивными элементами (кнопки);
 - проверка вводимыч данныч на валидность, вывод сообщения валидации;
 - добавление и удаление значения CSS-классов для HTML-элементов;
 - возможность добавлять контент в начало или в конец HTML-элемента, заменять контент внутри;

3) Класс ```View```<br>
<i>представляет собой итоговый класс, от которого наследуются все компоненты (наследуется от HTMLItemAPI).</i>

 - возможность кэшировать DOM-элементы, находящиеся внутри компонента;
 - копирование DOM-элементов, находящиеся внутри компонента;
 - стилизация компонентов по BEM
 - клонирование шаблонных элементов
 - вставка DOM-элементов в компонент

4) Класс ```API```<br>
<i>обеспечивает работу с данными сервера.</i>

 - возможность отправлять GET и POST-запросы

## Компоненты модели данных

1) Класс ```Button```

 - установка текста на кнопку

2) Класс ```Gallery```

 - добавление элементов в список галлереи;
 - активация выбираемого элемента;

3) Класс ```Modal``` обеспечивает работу модальных окон.

 - установка заголовка, контента, событий;
 - открытие и закрытие модального окна
 - сброс состояния внутренних компонентов модального окна;

4) Класс ```Form```

 - валидация инпутов
 - подтверждение формы

## Компоненты представления

1)Класс ```Card```
устанавливает в карточку необходимый контент

2)Класс ```Basket```
устанавливает контент для модального окна "Корзина"

3)Класс ```Payment```
устанавливает контент для модального окна "Способ оплаты"

4)Класс ```UserData```
устанавливает контент для модального окна "Данные пользователя"

5)Класс ```Success```
устанавливает контент для модального окна "Заказ оформлен!"

## Ключевые типы данных

```
type EventName = string | RegExp; // имя события
type EventsMap = Map<EventName, Set<EventHandler>> // объект, содержащий события и колбэки к ним

// основной интерфейс брокера событий
interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}


type DOMEvents = keyof HTMLElementEventMap 
type NodeType = HTMLElement // корневой элемент

type Url = string // базовый URL
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

type ViewElement<T extends HTMLElement = HTMLElement> = View<
  T,
  object,
  string,
  string
>

type ViewEvent = {
  element: ViewElement;
}

// интерфейс базового компонента "кнопка"
interface IButton {
  label: string;
}

// интерфейс базового компонента "галерея"
interface IGallery {
  items: GalleryItem[];
}

type GalleryItem = View<HTMLElement, object, 'click', string> | HTMLCustomItem<HTMLElement, 'click'>;

// интерфейс модального окна
interface IModal {
  header?: ViewElement;
  content: ViewElement;
  actions: ViewElement[];
}

// интерфейс формы
interface IFormState {
  valid: boolean;
  errors: string;
}
```
