function checkDogs(dogsJulia, dogsKate) {
  const dogsJuliaNew = dogsJulia.slice(1, -2);
  const bothData = [...dogsJuliaNew, ...dogsKate];
  bothData.forEach(function (value, key) {
    if (value >= 3)
      console.log(
        `Dog number ${key + 1} is an adult, and is ${value} years old`
      );
    else console.log(`Dog number ${key + 1} is still a puppy🐶`);
  });
}

const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];

const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

checkDogs(juliaData2, kateData2);
