// ▷▷▷ IMPORT

import './scss/styles.scss';

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

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// ШАБЛОНЫ
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
// темплейт товара в корзине
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// ХРАНИЛИЩЕ ДАННЫХ ПРИЛОЖЕНИЯ
const appData = new AppState({}, events);

// ГЛОБАЛЬНЫЕ КОНТЕЙНЕРЫ
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);

const payment = new Payment(cloneTemplate(orderTemplate), events);
//const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

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

// ИЗМЕНЕНИЕ КОРЗИНЫ
events.on('basket:changed', () => {
    // включение/отключение кнопки ОФОРМИТЬ
    basket.selected = appData.basket.length;

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
    page.counter = appData.basket.length;
    modal.close()
})

// УДАЛИТЬ ИЗ КОРЗИНЫ
events.on('basket:remove', (item: ProductItem) => {
    appData.removeBasket(item);
    page.counter = appData.basket.length;
})

// ОТКРЫТИЕ ФОРМЫ ОПЛАТЫ
events.on('payment:open', () => {
    modal.render({
        content: payment.render({
            // phone: '',
            // email: '',
            address: '',
            valid: false,
            errors: []
        })
    });
});

// получаем данные с сервера
api.getProductList()
  .then(data => {
      console.log(data);   // -----------------УДАЛИТЬ--------------------
      appData.setCatalog(data);
    //   console.log('Catalog:', appData.catalog)
    })
  .catch(err => {
    console.error('!!!error: ', err);
});


// -------------------------------------УДАЛИТЬ---------------------------------------
// function getCardsInfo() {
// return fetch('https://larek-api.nomoreparties.co/api/weblarek/product', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// }).then(resp => resp.json())
// }
  
// getCardsInfo().then(data => {
//   console.log(data.items);
//   data.items.map((item: object) => {
//     console.log(item);
//   })
// })

// api.getProductList()
//   .then(data => {
//     data.map(item => {
//         console.log(item)
//     })
//   })