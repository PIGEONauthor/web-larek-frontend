// ▷▷▷ IMPORT

import './scss/styles.scss';

import {IOrderForm} from "./types";
import {EventEmitter} from './components/base/events';
import {LarekAPI} from './components/LarekAPI';
import {CDN_URL, API_URL} from './utils/constants';
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import {Page} from './components/Page';
import {CatalogChangeEvent, ProductItem, AppState } from './components/AppData';
import { Card, CatalogItem, BasketCard } from './components/Card';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Payment } from './components/Payment';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// ШАБЛОНЫ
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// ХРАНИЛИЩЕ ДАННЫХ ПРИЛОЖЕНИЯ
const appData = new AppState({}, events);

// ГЛОБАЛЬНЫЕ КОНТЕЙНЕРЫ
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events, {
    onClick: () => {
        events.emit('payment:open')
    }
});

const payment = new Payment(cloneTemplate(orderTemplate), events, {
    onClick: () => {
        appData.setOrderField('payment', payment.getType());
        events.emit('contacts:open')
    }
});
const contacts = new Contacts(cloneTemplate(contactsTemplate), events, {
    onClick: () => {
        appData.setOrderField('total', appData.getTotal());
        appData.basket.forEach(order => {
            appData.setOrderField('items', order.id);
        });
        console.log(appData.order)
        events.emit('success:open')
    }
});
//const success = new Success(cloneTemplate(successTemplate), events);

// УСТАНОВКА КОЛБЭКА ДЛЯ ИЗМЕНЕНИЯ КАТАЛОГА
events.on/*<CatalogChangeEvent>*/('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            category: item.category,
            title: item.title,
            image: item.image,
            price: item.price
        });
    });

    //page.counter = appData.getClosedLots().length;
});

// записываем в превью выбираемый продукт
events.on('card:select', (item: ProductItem) => {
    appData.setPreview(item);
});

// меняем контент для модального окна ПРЕДПРОСМОТРА
events.on('preview:changed', (item: ProductItem) => {
    const showItem = (item: ProductItem) => {
        const card = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
            onClick: () => events.emit('basket:add', item),  // для добавления в корзину
        });
        modal.render({
            content: card.render({
                category: item.category,
                title: item.title,
                image: item.image,
                description: item.description.split("\n"),
                price: item.price,
            })
        });
    };

    if (item) {
        api.getProductItem(item.id)
            .then((result) => {
                item.description = result.description;
                // item.history = result.history;
                showItem(item);
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        modal.close();
    }
});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});


// ОТКРЫТИЕ КОРЗИНЫ
events.on('basket:open', () => {
    modal.render({
        content: createElement<HTMLElement>('div', {}, [
            basket.render()
        ])
    });

});

// ИЗМЕНЕНИЕ СОСТОЯНИЯ КОРЗИНЫ
events.on('basket:changed', () => {
    // включение/отключение кнопки ОФОРМИТЬ
    basket.enable = appData.basket.length;
    // пересчитать количество товара в корзине
    page.counter = appData.basket.length;

    basket.items = appData.basket.map((item, i) => {
        const basketItem = new BasketCard(cloneTemplate(cardBasketTemplate), {
            onClick: () => events.emit('basket:remove', item), // удаление товара из корзины
        });
        return basketItem.render({
            itemIndex: i+1,
            title: item.title,
            price: item.price
        })
    })

    // посчитать сумму заказа и установить в корзину
    basket.total = appData.getTotal();
})

// ДОБАВЛЕНИЕ В КОРЗИНУ
events.on('basket:add', (item: ProductItem) => {
    appData.setBasket(item);
    // page.counter = appData.basket.length;
    modal.close()
})

// УДАЛИТЬ ИЗ КОРЗИНЫ
events.on('basket:remove', (item: ProductItem) => {
    appData.removeBasket(item);
    // page.counter = appData.basket.length;
})

// ОТКРЫТИЕ ФОРМЫ ОПЛАТЫ
events.on('payment:open', () => {
    // убрать выбор способа оплаты
    payment.unselectAll();
    
    modal.render({
        content: payment.render({
            address: '',
            valid: false,
            errors: [],
        })
    });
    // возможно нужно будет удалить
    // events.emit('payment:changed', events)
});

// ИЗМЕНЕНИЕ СОСТОЯНИЯ ФОРМЫ ОПЛАТЫ
events.on ('payment:changed', () => {
    payment.valid = payment.getAddress() && payment.isSelected();
})

// ОТКРЫТИЕ ФОРМЫ С КОНТАКТНЫМИ ДАННЫМИ
events.on('contacts:open', () => {
    // events.emit('contacts:changed', events)

    modal.render({
        content: contacts.render({
            email: '',
            phone: '',
            valid: false,
            errors: [],
        })
    });

});

// ИЗМЕНЕНИЕ СОСТОЯНИЯ ФОРМЫ С КОНТАКТНЫМИ ДАННЫМИ
events.on ('contacts:changed', () => {
    contacts.valid = contacts.getEmail() && contacts.getPhone();
})

// ОТКРЫТИЕ УСПЕШНОГО ЗАКАЗА
events.on('success:open', () => {
    api.orderProducts(appData.order)
        .then((result) => {
            const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    appData.clearBasket();
                    events.emit('basket:changed');
                    events.emit('payment:changed');
                    modal.close();
                }
            });

            modal.render({
                content: success.render({
                    description: appData.getTotal()
                })
            });
        })
        .catch(err => {
            console.error(err);
        });
});


// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
    const { email, phone, address } = errors;
    payment.errors = contacts.errors = Object.values({email, phone, address}).filter(i => !!i).join('; ');
});

// Изменилось одно из полей
events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderField(data.field, data.value);
});
events.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderField(data.field, data.value);
});


// ----------------------------API----------------------------------
// получаем данные с сервера
api.getProductList()
  .then(data => {
      appData.setCatalog(data);
    })
  .catch(err => {
    console.error('!!!error: ', err);
});