import './scss/styles.scss';

import {EventEmitter} from './components/base/events';
import {LarekAPI} from './components/LarekAPI';
import {CDN_URL, API_URL} from './utils/constants';
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import {Page} from './components/Page';
import {CatalogChangeEvent, AppState } from './components/AppData';
import { Card } from './components/Card';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const appData = new AppState({}, events);

const page = new Page(document.body, events);

events.on/*<CatalogChangeEvent>*/('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            category: item.category,
            title: item.title,
            image: item.image,
            price: item.price,
        });
    });

    //page.counter = appData.getClosedLots().length;
});


// получаем с сервера товары
// api.getProductList()
//   .then(appData.setCatalog.bind(appData))
//   .catch(err => {
//     console.error('!!!error: ', err);
// });

api.getProductList()
  .then(data => {
      console.log(data);
      appData.setCatalog(data);
    //   console.log('Catalog:', appData.catalog)
    })
  .catch(err => {
    console.error('!!!error: ', err);
});

// console.log('Catalog:', appData)
// appData.catalog.map(item => console.log(item))


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