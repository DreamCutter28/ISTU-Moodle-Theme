// ==UserScript==
// @name         ISTU Moodle Theme
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Предложения/идеи можете присылать сюда: https://vk.com/dreamcutter
// @author       DreamCutter
// @match        https://el.istu.edu/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=istu.edu
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/darkreader@4.9.58/darkreader.min.js
// @license      GPL-3.0-or-later
// @run-at       document-body

// ==/UserScript==

DarkReader.enable({
  brightness: 100,
  contrast: 100,
  sepia: 0,
});

GM_addStyle('.sectionhead.toggle.toggle-folder { background-color: rgb(12, 90, 154) !important; }');
GM_addStyle('.sectionhead.toggle.toggle-folder { background-color: rgb(12, 90, 154) !important; }');
GM_addStyle('.unread { background-color: rgb(12, 90, 154) !important; }');
GM_addStyle('.day.text-center.hasevent.calendar_event_course.duration_finish { background-color: rgb(12, 90, 154) !important; }');
GM_addStyle('.coursebox.clearfix.even { background-color: rgb(30, 32, 33) !important; }');
GM_addStyle('.coursebox.clearfix.odd { background-color: rgb(30, 32, 33) !important; }');
GM_addStyle('.coursebox.clearfix.even { border-bottom: 1px solid #0A487B !important; }');
GM_addStyle('.coursebox.clearfix.odd { border-bottom: 1px solid #0A487B !important; }');

window.addEventListener('DOMContentLoaded', function() {

  document.querySelector('section#inst3040').parentNode.removeChild(document.querySelector('section#inst3040')); //Скрывает "Полезные (нет) ссылки"
  document.querySelector('#page-header').parentNode.removeChild(document.querySelector('#page-header')); //Скрывает хедер на главной странице с курсами, хлебные крошки там не оправданы
  document.querySelector('.paging.paging-morelink').parentNode.removeChild(document.querySelector('.paging.paging-morelink')); //Скрывает раздел "Все курсы"
  document.querySelector('#site-news-forum').parentNode.removeChild(document.querySelector('#site-news-forum')); //Скрывает "Новости сайта"
  document.querySelector('.box.py-3.mdl-align').parentNode.removeChild(document.querySelector('.box.py-3.mdl-align')); //Скрывает "Поиск курса"
  document.querySelector('.box.py-3.generalbox.sitetopic').parentNode.removeChild(document.querySelector('.box.py-3.generalbox.sitetopic')); //Скрывает ненужный отступ перед надписью "мои курсы"
  document.querySelector('section#inst65965').parentNode.removeChild(document.querySelector('section#inst65965')); //Скрывает окно "Подать заявку на создание курса"
  document.querySelector('section#inst2185').parentNode.removeChild(document.querySelector('section#inst2185')); //Скрывает окно "Последние объявления"
  document.querySelectorAll('.courseimage').forEach((picture) => {
      picture.parentNode.removeChild(picture)
  }); //Скрывает все картинки из списка курсов


  function hideElementsByClass(className) {
      var elements = document.querySelectorAll("." + className);
      for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = "none";
      }
  }

  document.addEventListener("DOMContentLoaded", function(event) {
      // Проверяем, были ли элементы скрыты при предыдущем посещении страницы
      GM.getValue("hiddenElements", []).then(function(hiddenElements) {
          // Если элементы были скрыты, скрываем их
          if (hiddenElements.length > 0) {
              hiddenElements.forEach(function(className) {
                  hideElementsByClass(className);
              });
          }
      });
  });


  function addButtonToHideClass(className) {
      const elements = document.querySelectorAll("." + className);
      for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const button = document.createElement('button');
          button.style.cssFloat = "top";
          button.style.width = "2%";
          button.style.fontSize = "0.6rem";
          button.textContent = 'x';
          button.style.textAlign = 'center';
          button.style.opacity = '0.5';
          button.addEventListener('click', () => {
              element.style.display = "none";
              GM.setValue(className + i, true); // сохраняем информацию о скрытом элементе
          });
          element.appendChild(button);
          // проверяем, был ли элемент скрыт в прошлый раз
          GM.getValue(className + i, false).then(hidden => {
              if (hidden) {
                  element.style.display = "none";
              }
          });
      }
  }

  function addShowAllButton(className) {
      const showAllButton = document.createElement('button');
      showAllButton.style.cssFloat = "right";
      showAllButton.style.opacity = '0.5';
      showAllButton.textContent = 'Вернуть скрытые элементы';
      showAllButton.addEventListener('click', () => {
          GM.listValues().then(function(keys) {
              keys.forEach(function(key) {
                  GM.deleteValue(key);
              });
          });
          location.reload();
      });
      const element = document.querySelector(className);
      element.appendChild(showAllButton);
  }

  addButtonToHideClass('coursebox.clearfix.even');
  addButtonToHideClass('coursebox.clearfix.odd');
  addShowAllButton("#frontpage-course-list");
});
