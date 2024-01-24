const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(function (dog) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

// 2.
dogs.forEach(function (dog) {
  if (dog.owners.includes('Sarah')) {
    if (
      dog.curFood > dogs.recommendedFood * 0.9 &&
      dog.curFood < dogs.recommendedFood * 1.1
    ) {
      console.log('Sarah`s dog is eating the recommended portion of food.');
    } else if (dog.curFood > dog.recommendedFood * 1.1) {
      console.log(
        'Sarah`s dog is eating more than the recommended portion of food.'
      );
    } else {
      console.log(
        'Sarah`s dog is eating less than the recommended portion of food.'
      );
    }
  }
});

// 3.
const ownersEatTooMuch = dogs
  .filter(function (dog) {
    return dog.curFood > dog.recommendedFood;
  })
  .flatMap(function (dog) {
    return dog.owners;
  });

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(function (dog) {
    return dog.curFood < dog.recommendedFood;
  })
  .flatMap(function (dog) {
    return dog.owners;
  });

console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much.`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little.`);

// 5.
console.log(
  dogs.some(function (dog) {
    return dog.curFood === dog.recommendedFood;
  })
);

// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
