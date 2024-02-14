'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
console.log(23 === 23.0);


// Strings para números
console.log(Number('23'));
console.log(+'23');


// Parsing
console.log(Number.parseInt('26px', 10));
console.log(Number.parseInt('e23', 10)); // não funciona, o número precisa vir antes da string
// o segundo argumento é a base do número que queremos mostrar, no caso base 10

console.log(Number.parseFloat('2.5px', 10));
console.log(Number.parseInt('2.5px', 10));


// isNaN
console.log(Number.isNaN(23));
console.log(Number.isNaN('23'));
console.log(Number.isNaN(+'23px'));
console.log(Number.isNaN(23 / 0));


// isFinite
console.log(Number.isNaN(23 / 0));
console.log(Number.isNaN('23')); // vai dar falso pq não é um número


// Raiz quadrada
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));


// Raiz cubica
console.log(8 ** (1 / 3));


//retornar maior e menor valor
console.log(Math.max(18, 23, 1, 10, 133));
console.log(Math.max(18, 23, 1, 10, '133'));

console.log(Math.min(18, 23, 1, 10, 133));
console.log(Math.min(18, 23, 1, 10, '133'));

console.log(Math.PI * Number.parseFloat('10px') ** 2);


// Função para gerar números aleatórios entre dois valores dados
function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
console.log(RandomInt(10, 20));


// Arredondamento de inteiros (funcionam com type coercion)
console.log(Math.trunc(23.5)); //arredonda para a parte inteira

console.log(Math.round(23.4)); //arredonda para o número mais próximo
console.log(Math.round(23.5));

console.log(Math.ceil(23.4)); //arredonda para cima

console.log(Math.floor(23.4)); //arrdonda pra baixo


// Arredondamento de decimais (retorna sempre uma string, arredonda a parte decimal em quantas casa for dado como argumento)
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.746).toFixed(3));
console.log((2.746).toFixed(2));
console.log(+(2.746).toFixed(2)); //para retornar um número


// Operador restante
console.log(5 % 2);

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (
    row,
    index
  ) {
    if (index % 2 === 0) row.style.backgroundColor = 'orangered';
    if (index % 3 === 0) row.style.backgroundColor = 'blue';
  });
});



// Separador númerico (Usa underlines com se fossem virgulas ou pontos para uma melhor leitura de grandes valores)
const num = 244_546_098_999;
console.log(num);

//ambos os núemros serão 1500, serve apenas para melhor leitura humana
const numero = 15_00;
const numero2 = 1_500;

console.log(numero);
console.log(numero2);

//com essas funções não funciona
console.log(Number('23_000'));//NaN
console.log(parseInt('23_000'));//vai retornar só o 23


// BigInt
console.log(2 ** 53 - 1); //Maior número representavel em 64 bits
console.log(Number.MAX_SAFE_INTEGER);

console.log(423423423425345614651541407456549840n);
console.log(BigInt(423423423425345614651541407456549840));
//operações são as mesmas, mas só podem ser feitas se todos os números forem BigInt (não fuciona raiz quadrada)

//erro: console.log(324254653463n + 452);
console.log(324254653463n + 452n);

//com operadores de comparação os numeros podem ser de tipos diferentes
console.log(20n > 20000); //falso, bigint é sempre considerado maior
console.log(20n === 20); //falso bigint é sempre considerado maior
console.log(20n == 20); //nesse caso dará verdadeiro pois == faz type coercion

//divisão
console.log(10 / 3); //resultado valor decimal
console.log(10n / 3n); //resultado valor inteiro (retorna o valor mais próximo do bigint)


// CRIANDO DATAS
//os meses são baseados em 0 (janeiro é o mês 0)
const now = new Date();
console.log(now);

console.log(new Date('Wed Feb 07 2024 10:24:46'));
console.log(new Date('25 december, 2028'));
console.log(new Date(account1.movementsDates[0]));

//trabalhando com datas
const future = new Date(2077, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); //dia da semana (zero para domingo)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); //converte a data para uma string que segue um padrão internacional
console.log(future.getTime()); //milissegundos que se passaram desde 1 de janeiro de 1970 "unix time"
console.log(new Date(3404571780000));
console.log(Date.now()); //milissegundos que se passaram desde 1 de janeiro de 1970 "unix time", considerando a data e o horário atual

future.setFullYear(2039); // seta o ano da data para o passado como parametros


// calculos com datas
const future = new Date(2077, 10, 19, 15, 23);
console.log(Number(future)); // as datas são armazenadas em milisegundos

// função para calcular o tempo passado entre duas datas
function calcDaysPassed(date1, date2) {
  return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); //math abs deixa sempre o número positivo
}

const daysPassed = calcDaysPassed(
  new Date(2077, 10, 29),
  new Date(2077, 10, 19)
);
console.log(daysPassed);


// INTERNACIONALIZAÇÃO DE DATAS
const now = new Date();
const options = {
  hour: 'numeric',
  minutes: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

const locale = navigator.language;

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now); //vai formatar a data para o modelo da lingua passado


// INTERNACIONALIZAÇÃO DE NÚMEROS
const num = 8931248403.45;

const options = {
  style: 'unit', //pode unit, percent ou currency
  unit: 'celsius',
  //currency: "EUR"
  //useGrouping: false (tira os separadores das dezenas, centenas etc)
};
console.log('Us: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Pt: ', new Intl.NumberFormat('pt-PT', options).format(num));
console.log('Ge: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Br: ', new Intl.NumberFormat('pr-BR', options).format(num));
console.log(
  'Browser',
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

// TIMERS

const ingredients = ['tomatoes', 'cheese'];

// contagem regressiva: primeiro argumento é a função que devera ser executada, a segunda é o tempo em milissegundos
// quaisquer argumentos apos o tempo serão argumentos para a função callback
const pizzaTimer = setTimeout(
  function (ing1, ing2) {
    console.log(`Here is your pizza with ${ing1} and ${ing2}!`);
  },
  5000,
  ...ingredients
);
console.log('Waiting...'); // o codigo continua a ser executado enquanto a contagem regressiva acontece

// é possivel cancelar o timer dada uma condição
if (ingredients.includes('cheese')) {
  clearTimeout(pizzaTimer);
  console.log('canceled order');
}

// printa a data a cada 3 segundos
setInterval(function () {
  console.log(new Date());
}, 3000);
