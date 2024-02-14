// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
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

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2020-08-15T09:30:45.123Z',
    '2020-09-20T15:12:18.567Z',
    '2020-11-05T11:27:30.890Z',
    '2020-12-10T08:45:56.421Z',
    '2021-01-18T17:59:12.765Z',
    '2021-03-22T14:20:30.654Z',
    '2021-05-15T19:35:40.987Z',
    '2021-06-28T10:42:53.326Z',
  ],
  currency: 'EUR',
  locale: 'fr-FR',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90, -600, 3000, -25],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2023-02-28T12:15:30.987Z',
    '2023-04-05T07:38:52.654Z',
    '2023-05-15T15:50:10.234Z',
    '2023-06-20T10:05:25.543Z',
    '2023-08-01T16:30:39.876Z',
    '2023-10-10T11:45:50.321Z',
    '2023-12-05T14:58:03.765Z',
    '2024-01-20T19:12:18.109Z',
  ],
  currency: 'AUD',
  locale: 'en-AU',
};

const account5 = {
  owner: 'Daniel Oliveira',
  movements: [2000, 1000, -780, -67, 330, 820, -900, 3000],
  interestRate: 1.1,
  pin: 5555,

  movementsDates: [
    '2020-08-15T09:30:45.123Z',
    '2020-09-20T15:12:18.567Z',
    '2020-11-05T11:27:30.890Z',
    '2020-12-10T08:45:56.421Z',
    '2021-01-18T17:59:12.765Z',
    '2021-03-22T14:20:30.654Z',
    '2021-05-15T19:35:40.987Z',
    '2024-02-08T10:42:53.326Z',
  ],
  currency: 'BRL',
  locale: 'pt-BR',
};

const accounts = [account1, account2, account3, account4, account5];

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

// Functions

function formatMovementsDate(date, locale) {
  // função para calcular o tempo passado entre duas datas
  function calcDaysPassed(date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); //math abs deixa sempre o número positivo
  }

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed < 7) return `${daysPassed} days ago`;
  else {
    /*
    const day = `${date.getDate()}`.padStart(2, 0); // caso o número tenha menos de 2 caracteres ele vai começar com 0
    const month = `${date.getMonth() + 1}`.padStart(2, 0); // pq é baseado em zero por se soma 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    */

    return new Intl.DateTimeFormat(locale).format(date);
  }
}

function formatCurrencies(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort(function (a, b) {
        return a - b;
      })
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]); // guarda as datas em um objeto chamado date, para usar os metodos abaixo
    const displayMovementsDate = formatMovementsDate(date, account.locale);

    const formatedMovements = formatCurrencies(
      mov,
      account.locale,
      account.currency
    );

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayMovementsDate}</div>
      <div class="movements__value">${formatedMovements}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance(account) {
  account.balance = account.movements.reduce(function (accumulator, current) {
    return accumulator + current;
  }, 0);

  labelBalance.textContent = formatCurrencies(
    account.balance,
    account.locale,
    account.currency
  );
}

function calcDisplaySummary(account) {
  const incomes = account.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = formatCurrencies(
    account.balance,
    account.locale,
    account.currency
  );

  const outcomes = account.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return mov + acc;
    }, 0);
  labelSumOut.textContent = formatCurrencies(
    Math.abs(outcomes),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (mov) {
      return (mov * account.interestRate) / 100;
    })
    .filter(function (mov) {
      return mov >= 1;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumInterest.textContent = formatCurrencies(
    interest,
    account.locale,
    account.currency
  );
}

function displayUI(acc) {
  // Display Movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}

function createUserName(accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
}

createUserName(accounts);

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

// EVENT HANDLER LOGIN
let currentAccount;
let timer;
/*
// ALWAYS LOGGED IN
currentAccount = account5;
displayUI(currentAccount);
containerApp.style.opacity = 100;
*/

btnLogin.addEventListener('click', function (e) {
  //Prevent form form submiting
  e.preventDefault();

  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    /*
    // Creating Current Date
    const date = new Date();
    console.log(date);
    const day = `${date.getDate()}`.padStart(2, 0); // caso o número tenha menos de 2 caracteres ele vai começar com 0
    const month = `${date.getMonth() + 1}`.padStart(2, 0); // pq é baseado em zero por se soma 1
    const year = date.getFullYear();
    const hours = `${date.getHours()}`.padStart(2, 0);
    const minutes = `${date.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`;
*/

    // INTERNACIONALIZAÇÃO DE DATAS
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //  weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //vai formatar a data para o modelo da lingua passado

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Reset Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    displayUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  // Clear fields
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // Reset Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    displayUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    // O emprestimo só será validado depois de 3 segundos
    setTimeout(function () {
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      displayUI(currentAccount);

      // Reset Timer
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();

      inputLoanAmount.value = '';
    }, 3000);
  }
});

// Close account (delete the account from accounts array)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = currentAccount.username;
  const pin = currentAccount.pin;

  if (
    inputCloseUsername.value === username &&
    Number(inputClosePin.value) === pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    // Delete Account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear Fields
  inputCloseUsername.value = inputClosePin.value = '';
});

// Sort
let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sortedState);
  sortedState = !sortedState;
});
