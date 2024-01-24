'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉Correct Number!';
document.querySelector('.number').textContent = 54;
document.querySelector('.score').textContent = 3030300303;
document.querySelector('.guess').value = 69;
*/

let score = 20;
let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

//Check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number.';
  }

  //when player wins
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Answer!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  //When the guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber ? '📈Too high.' : '📉Too low.';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game.';
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = '#df0000';
    }
  }
});

//Again button
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = 0;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
