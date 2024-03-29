https://github.com/PIGEONauthor/web-larek-frontend

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
[//]: <> (## ${\color{bisque}Архитектура}$)

[//]: <> (---------------------------БАЗОВЫЙ_КОД---------------------------)

## ${\color{bisque}Базовый \space код}$

${\color{bisque}  1)  }$ Класс ```EventEmitter```<br>
<i>данный класс позволяет сохранять и вызывать катстомные события.</i>

 - установка и снятие слушателей событий;
 - вызов слушателей при возникновении события;

${\color{bisque}  2)  }$ Класс ```Component```<br>
<i>данный класс является базовым для других компонентов.</i>

 - установка и снятие класса на элемент;
 - установка текста внутри элемента;
 - блокировка/разблокировка элементов(например сделать кнопку неактивной);
 - возврат корневого DOM-элемента.

${\color{bisque}  3)  }$ Класс ```API```<br>
<i>обеспечивает работу с данными сервера.</i>

 - возможность отправлять GET и POST-запросы

[//]: <> (---------------------------ХРАНИЛИЩА---------------------------)

## ${\color{bisque} Компоненты \space модели \space данных \space(хранение \space данных) }$

${\color{bisque}  1)  }$ Класс ```AppState```<br>
<i>данный класс содержит состояние корзины, каталога товаров и заказа</i>.

Класс позволяет добавлять товары в состояния корзины и каталога методами ```setBusket``` и ```setCatalog```,
получить сумму заказа через ```getTotal```, убрать товар из корзины ```removeBusket``` или очистить её ```clearBasket```.
Также класс позволяет методом ```setOrderField``` добавлять в состояние заказа данные, такие как: способ оплаты, почта, телефон, адрес, сумма и список товаров - эти данные нужны для отправки на сервер.

[//]: <> (---------------------------КОМПОНЕНТЫ_ПРЕДСТАВЛЕНИЯ---------------------------)

## ${\color{bisque}Компоненты \space представления}$

[//]: <> (---------------------------1_BASKET---------------------------)

${\color{bisque}  1)  }$ Класс ```Basket```<br>
<i>данный компонент предназначен для вывода контента в модальном окне Корзины</i>

в данном компоненте содержатся следующие поля:
 - ```list``` - HTML-элемент со списком товаров в корзине;
 - ```total``` - HTML-элемент содержащий итоговую сумму заказа.

сеттер ```items(items: HTMLElement[])``` принимает список элементов и размещает их в листе, сеттер ```enable(length: number)``` принимает аргументом длину списка товаров и разблокирует кнопку оформления.
сеттер ```total(total: number)``` устанавливает итоговую сумму в соответствующий HTML-элемент

[//]: <> (---------------------------2_MODAL---------------------------)

${\color{bisque}  2)  }$ Класс ```Modal```<br>
<i>компонент, отвечающий за работу модальных окон и вывод в них контента.</i>

в данном компоненте содержатся следующие поля:
 - ```closeButton``` - HTML-элемент кнопки закрытия модального окна;
 - ```content``` - HTML-элемент с контентом.

данный компонент имеет методы для открытия и закрытия модального окна - ```open()``` и ```close()```, а также метод ```render(data)```, который вызывает родительский метод и открывает модальное окно с отрисованным контентом.

[//]: <> (---------------------------3_Form---------------------------)

${\color{bisque}  3)  }$ Класс ```Form```<br>
<i>Данный компонент является основой для форм приложения.</i>

компонент имеет следующие поля:
- ```submit``` - HTML-элемент кнопки подтверждения формы;
- ```errors``` - HTML-элемент для вывода ошибок валидации

класс имеет сеттер ```valid(value: boolean)``` для блокировки/разблокировки кнопки подтверждения и сеттер для установки сообщения об ошибке - ```errors(value: string)```.

в качестве одного из параметров конструктор принимает ```actions```:
```TypeScript
constructor(protected container: HTMLFormElement, protected events?: IEvents, actions?: IActions)
```

для этого в конструкторе прописано условие, которое позволяет навесить любое событие на кнопку подтверждения при создании экземпляра формы:
```TypeScript
if (actions?.onClick) {
            this._submit.addEventListener('click', actions.onClick);
        }
    }
```

[//]: <> (---------------------------4_LarekAPI---------------------------)

${\color{bisque}  4)  }$ Класс ```LarekAPI```<br>
<i>компонент позволяет создать объект, в котором будут хранится Базовый адрес сервера и метды обращения к нему</i>

в данном классе есть методы, позволяюе получить весь список товаров с сервера - ```getProductList()``` и получить данные конкретного товара по его ID - ```getProductItem(id)```, а так же отправить данные заказа - ```orderProducts(order)```

[//]: <> (---------------------------5_PAGE---------------------------)

${\color{bisque}  5)  }$ Класс ```Page```<br>
<i>компонент позволяет вывести на старницу основные данные</i>

компонент имеет следующие поля:
 - ```counter``` - HTML-элемент счетчика количества товаров в корзине ;
 - ```catalog``` - HTML-элемент галереи с товарами;
 - ```wrapper``` - HTML-элемент основного контейнер всей страницы;
 - ```basket``` - HTML-элемент кнопки корзины;

данный компонент имее сеттеры ```counter(value: number)``` и ```catalog(items: HTMLElement[])``` для установки содержимого в соответвующие элементы на страницы,
а так же сеттер ```locked(value: boolean)``` для блокировки прокрутки страницы, с помощью набрасывания нужного класса на ```wrapper```.


[//]: <> (---------------------------6_CARD---------------------------)

${\color{bisque}  6)  }$ Класс ```Card```<br>
<i>является основой для компонентов, выводящих данные о товаре на страницу</i>

именнт следующие поля:
 - ```title``` - HTML-элемент заголовка в карточке
 - ```price``` - HTML-элемент цена товара
 - ```button``` - HTML-элемент кнопки в карточке, если кнопи в данной карточке нет, то слушатель вешается на весь контейнер

данный класс включает следующие сеттеры: ```id(value: string)```, ```title(value: string)``` и ``` price(value: number)``` для установки содержимого в соответвующие элементы на страницы.


[//]: <> (---------------------------7_CatalogItem---------------------------)

${\color{bisque}  7)  }$ Класс ```CatalogItem```<br>
<i>расширяет класс ```Card```, позволяет отображать карточку товара в галерее и на превью</i>

именнт следующие поля:
 - ```category``` - HTML-элемент, в котором указана категория товара
 - ```image``` - HTML-элемент, содержащий изобрадение товара
 - ```description``` - HTML-элемент с описанием товара

компонент содержит ряд сеттеров для установки содержимого в элементы, а также метод ```categoryColor(value: string)```, который используется в сеттере ```category(value: string)``` для отображения различного цвета контейнера категории.

[//]: <> (---------------------------8_BasketCard---------------------------)

${\color{bisque}  8)  }$ Класс ```BasketCard```<br>
<i>еще один класс, расширяющий ```Card``` и используемый для создания элементов списка корзины</i>

добавляется поле ```itemIndex```, представляющее собой HTML-элемент с порядковым номером заказа.

кроме сеттера ```itemIndex(value: number)``` в классе больше методов нет.

[//]: <> (---------------------------9_PAYMENT---------------------------)

${\color{bisque}  9)  }$ Класс ```Payment```<br>
<i>данный класс является дочерним для класса ```Form``` и используется для работы с формой "Способ оплаты"</i>

имеет следующие поля:
  - ```buttons``` - массив с HTML-элементами кнопок
  - ```address``` - HTML-элемент с инпутом для ввода адреса

Класс позволяет получить значение из инпута методом ```getAddress()``` и определить, выбран ли какой-либо способ оплаты методом ```isSelected()```,
вместе два данных метода позволяют определить. можно ли разблокировать кнопку подтверждения формы.

Так же в классе имеются следующие методы:
 - ```selected(name)``` - переключение выбираемой кнопки с последующим снятием выборки с соседней;
 - ```unselectAll()``` - убрать выборку со всех кнопок;
 - ```getType``` - возвращает способ оплаты, используется для заполнения данных в статусе заказа(находящимся в ```AppState```)

при создании экземпляра данного класса на кнопку подтверждения формы вешается обработчик, который открывает следующую форму или иное окно

[//]: <> (---------------------------10_Contacts---------------------------)

${\color{bisque}  10)  }$ Класс ```Contacts```<br>
<i>данный класс является дочерним для класса ```Form``` и используется для работы с формой ввода почты и телефона</i>

имеет следующие поля:
  - ```email``` - HTML-элемент с инпутом для ввода электронной почты
  - ```phone``` - HTML-элемент с инпутом для ввода номера телефона

Класс позволяет получить значения из полей ввода методами ```getEmail``` и ```getPhone```, который используются чтобы определить, можно ли разблокировать кнопку подтверждения формы.

при создании экземпляра данного класса на кнопку подтверждения формы вешается обработчик, который открывает следующую форму или иное окно

[//]: <> (---------------------------11_SUCCESS---------------------------)

${\color{bisque}  11)  }$ Класс ```Success```<br>
<i>данный класс используется для отображения окна с уведомлением об успешном заказе</i>

класс имеет следующие поля:
 - ```description``` - HTML-элемент, содержащий текст с количеством списанных средств;
 - ```close``` - HTML-элемент кнопки закрытия окна

в классе реализован сеттер ```description```, при помощи которого устанавливается текст в соответствующий контейнер

[//]: <> (---------------------------КЛЮЧЕВЫЕ_ТИПЫ_ДАННЫХ---------------------------)

## ${\color{bisque}  Ключевые \space типы \space данных  }$

```TypeScript
// интерфейс, описывающий карточку товара
export interface ICard<T> {
    id: string;
    category?: string;
    title: string;
    image?: string;
    price: number;
    description?: string | string[];
    itemIndex: number;
}

// интерфейс описания товара
export interface IProductItem {
    id: string;
    category: string;
    title: string;
    description?: string;
    image?: string;
    price: number;
}

// интерфейс описания заказа
export interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

// интерфейс описания состояния приложения
export interface IAppState {
    catalog: IProductItem[];
    basket: string[];
    preview: string | null;
    order: IOrderForm | null;
    loading: boolean;
}

```
