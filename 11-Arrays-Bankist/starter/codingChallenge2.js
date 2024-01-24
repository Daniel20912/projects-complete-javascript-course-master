const Data1 = [5, 2, 4, 1, 15, 8, 3];

function calcAverageHumanAge(array) {
  return array.map(function (dogAge) {
    if (dogAge <= 2) return dogAge * 2;
    else return 16 + dogAge * 4;
  });
}

const humanAge = calcAverageHumanAge(Data1);
console.log('Idades Humanas:', humanAge);

const humanAgeNew = humanAge.filter(function (dogAge) {
  return dogAge > 18;
});
console.log('Idades Humanas maiores que 18:', humanAgeNew);

const average =
  humanAge.reduce(function (acc, age) {
    return acc + age;
  }, 0) / humanAge.length;

console.log('Média de Idades Humanas:', average);
