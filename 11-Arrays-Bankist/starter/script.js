'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE METHOD
// Cria uma cópia superficial
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// SPLICE METHOD
// Altera o array original
console.log(arr.splice(1, 2));
console.log(arr);

// REVERSE METHOD
// Altera o array original
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT METHOD
const letters = arr.concat(arr2);
console.log(letters);
// Mesmo que:
console.log([...arr, ...arr2]);

// JOIN METHOD
console.log(letters.join(' - '));

// NEW AT METHOD
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// Ultimo elemento do array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));



// FOR OF
for (const movement of movements) {
  if (movement > 0) console.log(`You deposited ${movement}`);
  else console.log(`You withdrew ${Math.abs(movement)}`);
}
console.log('---------------------------------------------------');
// entries retorna a posição e o valor de cada indice
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`Movement ${i + 1}: You deposited ${movement}`);
  else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
}

console.log('---------------------------------------------------');

// FOR EACH           // 1o elemento 2o indice
movements.forEach(function (movement, i) {
  if (movement > 0) console.log(`Movement ${i + 1}: You deposited ${movement}`);
  else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach;
(function (value, key, map) {
  console.log(`${key}: ${key}`);
});

// MAP MATHOD
// Cria um novo array

const eurToUSD = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUSD;
});

console.log(movements);
console.log(movementsUSD);

const movementsDescriptions = movements.map(function (mov, i) {
  if (mov > 0) return `Movement ${i + 1}: You deposited ${mov}`;
  else return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
});
console.log(movementsDescriptions);

// FILTER METHOD
const deposit = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposit);

const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawal);

//REDUCE METHOD
// Recebe de argumento a função e o número inicial do acumulador que no caso é zero
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function (accumulator, current, index, array) {
  return accumulator + current;
}, 0);

console.log(balance);

// Maior valor do array
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);


// ENCADEAMENTO
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;

// Filtra os valores positivos, passa para dólar e soma todos em uma única variável
const totalDepositUSD = movements
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov) {
    return mov * eurToUSD;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

console.log(totalDepositUSD);


// FIND METHOD


// Retorna apenas o primeiro elemento do array que for verdadeiro dado a condição
// Retorna apenas o elemento e não o array
const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});
console.log(firstWithdrawal);


// SOME METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// O includes retorna true ou false se o valor existe ou não no array
// Somente testa igualdades
console.log(movements);
console.log(movements.includes(-130));

// É possivel se usar condições
const anyDepositis = movements.some(function (mov) {
  return mov > 1500;
});
console.log(anyDepositis);

// EVERY METHOD
// Testa se todos os valores do array são condinzentes e retorna true ou false
console.log(
  movements.every(function (mov) {
    return mov > 0;
  })
);


// FLAT
const arr = [[1, 2, 3], [4, 5, 6], 8];
// Une um array com outros arrays em um só
console.log(arr.flat());

const arrayDeep = [[[1, 2], 3], [4, [5, 6]], 8];
// Deve se passar como parametro o nivel de aninhamento
console.log(arrayDeep.flat(2));

const overlayBalance = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

console.log(overlayBalance);

// FLATMAP
// Faz o Map depois o Flat em um método só
const overlayBalance2 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
console.log(overlayBalance2);


// SORT
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Altera o array original

// Ordem alfabética
const names = ['Daniel', 'Abel', 'Carla', 'Eduardo'];
console.log(names.sort());

// Ordem númerica
// O sort trabalha com strings
// Return < 0, A, B (keep order)
// Return > 0, B, A (switch order)

// Ordem crescente
console.log(
  movements.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
  })
);

console.log(
  movements.sort(function (a, b) {
    return a - b;
  })
);

// Ordem decrescente
console.log(
  movements.sort(function (a, b) {
    if (a < b) return 1;
    if (a > b) return -1;
  })
);

console.log(
  movements.sort(function (a, b) {
    return b - a;
  })
);

// FILL METHOD
// Se passar apenas um valor para a função new Array, isso será o número de índices vazios
// O único método possivel de se usar nele é o fill
const x = new Array(7);
console.log(x);

// Encherá o array com 1's
// Altera o array original
x.fill(1);
console.log(x);

// A partir do índice 3
x.fill(3, 3);
console.log(x);

// A partir do 3 até o 7
x.fill(5, 5, 7);
console.log(x);

// ARRAY.FROM
const y = Array.from({ length: 7 }, function () {
  return 1;
});
console.log(y);

// 1 ao 7
const z = Array.from({ length: 7 }, function (_, index) {
  return index + 1;
});
console.log(z);
*/

// PRACTICE

// 1.
const bankDepositSum = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .filter(function (mov) {
    return mov > 0;
  })
  .reduce(function (sum, mov) {
    return sum + mov;
  }, 0);

console.log(bankDepositSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce(function (count, curr) {
    return curr >= 1000 ? count + 1 : count;
  }, 0);

console.log(numDeposits1000);

// 3.
const sums = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce(
    function (sums, curr) {
      curr > 0 ? (sums.deposits += curr) : (sums.withdrawls += curr);
      return sums;
    },
    { deposits: 0, withdrawls: 0 }
  );

console.log(sums);

// 4.
function convertTitleCase(title) {
  const exceptions = ['a', 'an', 'on', 'the', 'but', 'or', 'in', 'with', 'is'];
  function captizalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return exceptions.includes(word) ? word : captizalize(word);
    })
    .join(' ');

  return captizalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title'));
