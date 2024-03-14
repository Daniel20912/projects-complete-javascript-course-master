'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// O "e" se refere ao proprio btnScrollTo
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // pega as coordenadas dessa seção
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  /*
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + pageYOffset
  ); // a distancia do topo deve ser calculada a partir da distancia da seção até o topo da página, e não até o topo da janela de visualização
  

  // assim a animação de scroll será suave
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + pageYOffset,
    behavior: 'smooth',
  });
  */

  // Maneira mais moderna de fazer isso
  section1.scrollIntoView({ behavior: 'smooth' });
});

// LINKS PARA NAVEGAÇÃO

/*
document.querySelectorAll('.nav__link').forEach(function (element) {
  element.addEventListener('click', function (e) {
    e.preventDefault(); // ao clicar no link a página é movida para a seção 2
    const id = this.getAttribute('href'); // tem que usar o getAttribute pq senão ele vai pegar o link da seção

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target); // mostra onde o mouse clicou
  e.preventDefault(); // ao clicar no link a página é movida para a seção 2

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // tem que usar o getAttribute pq senão ele vai pegar o link da seção
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Activate Area
  tabs.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });

  tabsContent.forEach(function (content) {
    content.classList.remove('operations__content--active');
  });

  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADING ANIMATION
function handleOver(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleOver.bind(0.5));

nav.addEventListener('mouseout', handleOver.bind(1));

// STICKY NAVIGATION

/*
const initialCoords = section1.getBoundingClientRect(); // pega as coordenadas da seção 1
window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // ativa a função 90 pixels antes do header sair da tela
});

headerObserver.observe(header);

// REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES
const imgTarget = document.querySelectorAll('img[data-src]'); // seleciona todas a imagens que possuem essa propriedade

function loadImg(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // Apenas deve executar a ação caso esteja interceptando (melhor desempenho)

  // replace src with data-src
  entry.target.src = entry.target.dataset.src; // O .target é o que o observer está observando em si (no caso a imagem)

  // assim só vai remover o blur quando a imagem for completamente carregada
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // faz as imagens começarem a carregar antes de aparecerem na tela
});

imgTarget.forEach(function (img) {
  imgObserver.observe(img);
});

function slider() {
  // SLIDER
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  function createDots() {
    // O underline significa que não temos interesse no primeiro parâmetro
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  function activateDot(slide) {
    document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * i}%)`;
  });
  // coloca cada um dos slides em uma das posições na tela: 0%, 100%, 200%

  function goToSlide(slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  function nextSlide() {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function init() {
    createDots();
    activateDot(0);
    goToSlide(0);
  }
  init();

  // next slide
  btnRight.addEventListener('click', nextSlide); // -100%, 0%, 100%

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
  });

  // previous slide
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();
