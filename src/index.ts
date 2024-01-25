// ▷▷▷ IMPORT

import './scss/styles.scss';

import {EventEmitter} from './components/base/events';
import {LarekAPI} from './components/LarekAPI';
import {CDN_URL, API_URL} from './utils/constants';
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import {Page} from './components/Page';
import {CatalogChangeEvent, ProductItem, AppState } from './components/AppData';
import { Card } from './components/Card';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// ШАБЛОНЫ
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// ХРАНИЛИЩЕ ДАННЫХ ПРИЛОЖЕНИЯ
const appData = new AppState({}, events);

// ГЛОБАЛЬНЫЕ КОНТЕЙНЕРЫ
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);

// УСТАНОВКА КОЛБЭКА ПРИ ИЗМЕНЕНИИ В КАТАЛОГЕ
events.on/*<CatalogChangeEvent>*/('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
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
        const card = new Card('card', cloneTemplate(cardPreviewTemplate));
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

// 
// events.on('bids:open', () => {
//     modal.render({
//         content: createElement<HTMLElement>('div', {}, [
//             tabs.render({
//                 selected: 'active'
//             }),
//             bids.render()
//         ])
//     });
// });

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