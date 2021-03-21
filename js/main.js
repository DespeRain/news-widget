let news = [{
    id: 1,
    title: 'Ежедневная сводка по коронавирусу',
    author: 'mail.ru',
    date: '20.03.2021',
    text: 'Читайте сейчас, чтобы узнать актуальные новости',
    link: 'javascript:;',
    status: 'Не прочитано'
  },
  {
    id: 2,
    title: 'Как правильно резать хлеб',
    author: 'Гордон Рамзи',
    date: '15.02.2021',
    text: 'Эта информация изменит Вашу жизнь',
    link: 'javascript:;',
    status: 'Не прочитано'
  },
  {
    id: 3,
    title: 'Подборка картинок с котиками',
    author: 'Василий Котов',
    date: '14.02.2021',
    text: 'Предоставляем Вашему вниманию огромную коллекцию отборных картинок с котами',
    link: 'javascript:;',
    status: 'Не прочитано'
  },
  {
    id: 4,
    title: 'Добро пожаловать!',
    author: 'Вараксин Сергей',
    date: '12.01.2003',
    text: 'Спасибо, что посетили этот сайт =)',
    link: 'javascript:;',
    status: 'Не прочитано'
  }
];

// checks if the widget is currently open

let widgetActive = false;

const STATUS_COLOR_DEFAULT = "rgb(148, 206, 240)";
const STATUS_COLOR_READ = '#fff'

// converts news array item data into HTML

function toHTML(item) {
  return `
  <div class="message" data-id=${item.id} style="background-color: ${item.status === 'Прочитано' ? STATUS_COLOR_READ : STATUS_COLOR_DEFAULT}">
  <h2 class="message__title">${item.title}</h2>
  <div class="message__author">${item.author}</div>
  <div class="message__date">${item.date}</div>
  <a href="${item.link}" class="message__link">${item.text}</a>
  <div class="message__status">${item.status}</div>
  </div>
  `
}

// creates widget button and div for widget inner content

function createWidget() {
  const widget = document.createElement('div');
  widget.classList.add('widget');
  widget.innerHTML = `
  <div class="widget__inner">
  </div>
  <button class="widget__btn">${news.length === 2 || news.length === 3 || news.length === 4 ? `В ленте ${news.length} сообщения` :  `В ленте ${news.length} сообщений`}</button>`
  document.body.appendChild(widget);
  const btn = widget.querySelector('.widget__btn');
  btn.addEventListener('click', renderNews);
}

// changes the status of the message on click

function newsListener(event) {
    event.preventDefault();
    const card = event.target.closest('.message');
    if (card) {
      const id = +card.dataset.id
      card.style.backgroundColor = STATUS_COLOR_READ;
      card.querySelector('.message__status').innerText = 'Прочитано'
      const item = news.find(n => n.id === id);
      item.status = 'Прочитано';
    } else {
      return
    }
  }



// fills widget inner content or clears it

function renderNews() {
  const widgetInner = document.querySelector('.widget__inner');

  if (!widgetActive) {
    const html = news.map(item => toHTML(item)).join('');
    widgetInner.innerHTML = html
    widgetInner.addEventListener('click', newsListener)

    widgetActive = true;
  } else {
    widgetInner.innerHTML = '';
    widgetInner.removeEventListener('click', newsListener)
    widgetActive = false;
  }
}


createWidget();