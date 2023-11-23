import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
   //numb - количество нажатий на конкретный элемент
  list: [
    {code: 1, title: 'Название элемента', numb: 0},
    {code: 2, title: 'Некий объект', numb: 0},
    {code: 3, title: 'Заголовок', numb: 0},
    {code: 4, title: 'Очень длинное название элемента из семи слов', numb: 0},
    {code: 5, title: 'Запись', numb: 0},
    {code: 6, title: 'Шестая запись', numb: 0},
    {code: 7, title: 'Седьмая запись', numb: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
