// Рендерим шаблоны с помощью handlebars
function renderHtml(templateName, list, obj) {
  let template = document.querySelector(templateName).textContent;
  let render = Handlebars.compile(template);
  let html = render(obj);
  let result = document.querySelector(list);
  result.innerHTML = html;
}

// Форматирование даты в строку
function getStringData(date) {
  let curr_date = date.getDate();
  let curr_month = date.getMonth() + 1;
  let curr_year = date.getFullYear();
  let thisDate = { date: `${curr_year}-${curr_month}-${curr_date}` };
  return thisDate;
}

// Получаем даты в виде массива
function getDatesArray() {
  let dateOld = new Date();
  let todayData = new Date();
  let arrayOld = [];
  let arrayNew = [];

  for (let index = 0; index <= 6; index++) {
    dateOld.setDate(dateOld.getDate() - 1);
    let dateString = getStringData(dateOld);
    arrayOld.push(dateString);
  }

  for (let index = 0; index <= 6; index++) {
    if (index !== 0) {
      todayData.setDate(todayData.getDate() + 1);
    }
    let dateString = getStringData(todayData);
    arrayNew.push(dateString);
  }

  return arrayOld.reverse().concat(arrayNew);
}

// Ищем бронирование на определенную дату и время(Возвращаем найденную бронь по дате и времени, если была, и массив всех броней)
function searchRegistration(date, time) {
  let storageArray = JSON.parse(localStorage.getItem('registration'));
  let returnArray = storageArray.find((item) => {
    if (item.time == time && item.date == date) return item;
    else return false;
  });
  return {
    findReg: returnArray,
    allReg: storageArray,
  };
}

const dateSelect = getDatesArray();
const timeSelect = [{ time: '10:00' }, { time: '12:00' }, { time: '14:00' }, { time: '16:00' }, { time: '18:00' }, { time: '20:00' }];
const placesBegin = [
  { id: 1, busy: false },
  { id: 2, busy: false },
  { id: 3, busy: false },
  { id: 4, busy: false },
  { id: 5, busy: false },
  { id: 6, busy: false },
  { id: 7, busy: false },
  { id: 8, busy: false },
  { id: 9, busy: false },
  { id: 10, busy: false },
  { id: 11, busy: false },
  { id: 12, busy: false },
  { id: 13, busy: false },
  { id: 14, busy: false },
  { id: 15, busy: false },
  { id: 16, busy: false },
  { id: 17, busy: false },
  { id: 18, busy: false },
  { id: 19, busy: false },
  { id: 20, busy: false },
  { id: 21, busy: false },
  { id: 22, busy: false },
  { id: 23, busy: false },
  { id: 24, busy: false },
  { id: 25, busy: false },
  { id: 26, busy: false },
  { id: 27, busy: false },
  { id: 28, busy: false },
  { id: 29, busy: false },
  { id: 30, busy: false },
  { id: 31, busy: false },
  { id: 32, busy: false },
  { id: 33, busy: false },
  { id: 34, busy: false },
  { id: 35, busy: false },
  { id: 36, busy: false },
  { id: 37, busy: false },
  { id: 38, busy: false },
  { id: 39, busy: false },
  { id: 40, busy: false },
  { id: 41, busy: false },
  { id: 42, busy: false },
  { id: 43, busy: false },
  { id: 44, busy: false },
  { id: 45, busy: false },
  { id: 46, busy: false },
  { id: 47, busy: false },
  { id: 48, busy: false },
  { id: 49, busy: false },
  { id: 50, busy: false },
  { id: 51, busy: false },
  { id: 52, busy: false },
  { id: 53, busy: false },
  { id: 54, busy: false },
  { id: 55, busy: false },
  { id: 56, busy: false },
  { id: 57, busy: false },
  { id: 58, busy: false },
  { id: 59, busy: false },
  { id: 60, busy: false },
  { id: 61, busy: false },
  { id: 62, busy: false },
  { id: 63, busy: false },
  { id: 64, busy: false },
  { id: 65, busy: false },
  { id: 66, busy: false },
  { id: 67, busy: false },
  { id: 68, busy: false },
  { id: 69, busy: false },
  { id: 70, busy: false },
  { id: 71, busy: false },
  { id: 72, busy: false },
  { id: 73, busy: false },
  { id: 74, busy: false },
  { id: 75, busy: false },
  { id: 76, busy: false },
  { id: 77, busy: false },
  { id: 78, busy: false },
  { id: 79, busy: false },
  { id: 80, busy: false },
];

$(document).ready(function () {
  // Рендерим селекты
  renderHtml('#date_list', '.select_date', { array: dateSelect });
  renderHtml('#time_list', '.select_time', { array: timeSelect });
  // Инициализация localStorage
  alert('После выбора даты и времени нажимайте кнопку "Проверить наличие" чтобы посмотреть наличие броней на дату и время');
  if (!localStorage.getItem('registration')) {
    let test = [
      {
        date: '31-12-20',
        time: '14:00',
        places: placesBegin,
      },
    ];
    localStorage.setItem('registration', JSON.stringify(test));
  }

  // При клике на место в зале задаем атрибут для последующего считывания
  document.addEventListener('click', (e) => {
    let elem = e.target;
    if (elem.classList.contains('place')) {
      if (elem.getAttribute('verb') == 'false') elem.setAttribute('verb', 'true');
      else elem.setAttribute('verb', 'false');
    }
  });

  // При клике на кнопку проверяем наличие мест на установленный момент времени
  $('#check_availability').click(() => {
    let date = $('#date').val();
    let time = $('#time').val();
    let findArray = searchRegistration(date, time);
    let renderArray = findArray.findReg ? findArray.findReg.places : placesBegin;
    let count = 0;
    renderArray.forEach((item) => {
      if (item.busy === 'true') count++;
    });
    // Рендерим места в зале (если на данный момент были забронированы места в зале, отображаем их)
    renderHtml('#place_list', '.scoreboard_body', { count: count, array: renderArray });
  });

  // При клике на кнопку бронируем выбранные места
  $('#regist').click(() => {
    let date = $('#date').val();
    let time = $('#time').val();
    let currentDate = new Date();
    if (Date.parse(currentDate) - 86400000 > Date.parse(date)) {
      // Очищаем поля броней
      renderHtml('#place_list', '.scoreboard_body', { array: placesBegin });
      alert('Бронь невозможна задним числом (только просмотр броней на тот момент по нажатию на кнопу "Проверить наличие")');
    } else {
      let boof = document.querySelectorAll('.place');
      let placeArray = [];

      // Перебираем элементы DOM, строим массив объектов
      boof.forEach((item) => {
        placeArray.push({
          id: item.getAttribute('position'),
          busy: item.getAttribute('verb'),
        });
      });

      // Объект для сохранения в localStorage
      let objFromSave = {
        date: date,
        time: time,
        places: placeArray,
      };
      // Сохраняем измененения с учетом броней(если были на этот период)
      let resaveArray = searchRegistration(date, time);
      // Фильтруем и получаем массив броней, если была найдена бронь на данную дату, убираем ее
      let allReg = resaveArray.allReg.filter((item) => {
        if (item.time == time && item.date == date) return false;
        else return item;
      });
      // Пушим обновленный объект брони
      allReg.push(objFromSave);
      // Сохраняем обновленный список в localStorage
      localStorage.setItem('registration', JSON.stringify(allReg));
      alert('Бронь прошла успешно! Нажмите кнопку "Проверить наличие" чтобы обновить список броней');
    }
  });
});
