// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Daniel Oliveira',
  movements: [2000, 1000, -780, -67, 330],
  interestRate: 1.1,
  pin: 5555,
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

function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? movements.slice().sort(function (a, b) {
        return a - b;
      })
    : movements;
  movs.forEach(function (movs, i) {
    const type = movs > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${movs}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance(account) {
  account.balance = account.movements.reduce(function (accumulator, current) {
    return accumulator + current;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
}

function calcDisplaySummary(account) {
  const incomes = account.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return mov + acc;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

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
  labelSumInterest.textContent = `${interest}€`;
}

function displayUI(acc) {
  // Display Movements
  displayMovements(acc.movements);

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

// EVENT HANDLER LOGIN
let currentAccount;

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

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
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

    // Update UI
    displayUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    currentAccount.movements.push(amount);
    displayUI(currentAccount);
    inputLoanAmount.value = '';
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
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});
