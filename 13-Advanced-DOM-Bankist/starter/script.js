'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  return btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
// SELECIONANDO ELEMENTOS
console.log(document.documentElement); //seleciona todo o HTML
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // seleciona o primeiro elemento que condiz com esse nome
const allSections = document.querySelectorAll('.section'); // seleciona todos os elementos que condizem com o nome
console.log(allSections);

console.log(document.getElementById('section--1'));
console.log(document.querySelectorAll('#section--1')); // como o get element by id não precisa do #

// Esses geram um HTML collection que se atualiza automaticamente caso um elemento seja excluido
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// CRIANDO ELEMENTOS E INSERINDO ELEMENTOS

// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message); // adicona o elemento como primeiro filho do elemento
header.append(message); // adciona o elemnto como ultimo filho do elemnto
//header.prepend(message.cloneNode(true)); // faz aparecer em dois lugares ao mesmo tempo

// header.before(message); // coloca a mensagem antes do header
// header.after(message); // coloca depois do header

// DELETAR ELEMENTOS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '104.2%';

console.log(message.style.height); //não vai mostrar nada pois ele só mostra se nós definimos manualmente o estilo usando a propriedade style
console.log(message.style.backgroundColor); // esse vai mostrar pq foi definido manualmente
console.log(message.style.color); //não vai mostrar nada, mesmo que seja uma propriedade que exista dentro do css

console.log(getComputedStyle(message).color); // essa função mostra a propriedade mesmo quue ela não tenha sido definida manualmente
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orange'); // altera a  propriedade do elemento root --color-primary dentro do css

// ATRIBUTOS
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.className);

console.log(logo.designer); //não vai mostrar nada pq o atributo designer não é esperado em uma imagem
console.log(logo.getAttribute('designer')); //usando essa função é possivel ve-lo

logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// DATA ATTRIBUTES
console.log(logo.dataset.versionNumber);

// CLASSES
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Não usar
logo.className = 'Daniel';


// EVENTOS

const h1 = document.querySelector('h1');

const alerth1 = function (e) {
  alert('nooooouuuuuusssssaaaaa');
  //h1.removeEventListener('mouseenter', alerth1);
};

h1.addEventListener('mouseenter', alerth1);

// outra maneira de fazer isso

h1.onmouseenter = function (e) {
  alert('nooooouuuuuusssssaaaaa');
};


setTimeout(function () {
  h1.removeEventListener('mouseenter', alerth1);
}, 3000);


// Event Propagation

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}

console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // stop propagation
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});


// TRAVESSIA NO DOM

const h1 = document.querySelector('h1');

// downwards: child elements
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children); // mostras todos os elementos filhos do elemento h1
h1.firstElementChild.style.color = 'white'; // seleciona o primerio elemento filho
h1.lastElementChild.style.color = 'red'; // seleciona o último elemento filho

// upwards: parent elements
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // closest seleciona o elemento pai mais próximo com esse nome de classe

// sideways: siblings
console.log(h1.previousElementSibling); // retorna apenas o elemento
console.log(h1.nextElementSibling);

console.log(h1.nextSibling); // retorna um node de elementos
console.log(h1.previousSibling);
*/

// INTERSECTION API
function obsCallBack(entries, observer) {
  entries.forEach(function (entry) {
    console.log(entry);
  });
} // essa função será chamada sempre que o elemento alvo (section1) interceptar o elemento root do objeto, dentro do limite definido no threshold

const obsOptions = {
  root: null, // é o elemento que será observado, se for colocado null então será toda a tela observada
  threshold: 0.1, // porcentagem que queremos visivel do elemento alvo (section1) no elemento root
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(section1);

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
