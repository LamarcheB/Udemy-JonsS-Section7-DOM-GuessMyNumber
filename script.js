"use strict";

//*****************************************************************************/
//***                        Selecting HTML elements                        ***/
//*****************************************************************************/

// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent =
//   "Winner winner! Chicken Dinner!";

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// document.querySelector(".guess").value = 23;
//
//
//
//*****************************************************************************/
//***                            Event Listener                             ***/
//*****************************************************************************/
const msg = document.querySelector(".message");
const score = document.querySelector(".score");
const restart = document.querySelector(".again");
const highScore = document.querySelector(".highScore");
const check = document.querySelector(".check");
const number = document.querySelector(".number");

let secretNumber = generateSecretNumber();
console.log(secretNumber);

let lives = 20;
let isGameOver = false;

check.addEventListener("click", function () {
  const userGuess = Number(document.querySelector(".guess").value);

  if (!isGameOver) {
    if (userGuess > 20 || userGuess < 1 || !userGuess) {
      msg.textContent = "Invalid entry, please enter a number between 1 and 20";
    } else {
      if (userGuess === secretNumber) {
        isGameOver = true;
        msg.textContent = `${userGuess} was the right number! You win!!!`;
        updateHighScore(lives);
      } else if (userGuess <= secretNumber) {
        msg.textContent = `${userGuess} is too low, try again!`;
        lives--;
      } else if (userGuess >= secretNumber) {
        msg.textContent = `${userGuess} is too high, try again!`;
        lives--;
      }
      score.textContent = `${lives}`;
    }

    if (lives === 0) {
      msg.textContent = `YOU LOSE!!!!`;
      isGameOver = true;
    }
  }
});

restart.addEventListener("click", function () {
  if (isGameOver) {
    document.querySelector(".guess").value = "";
    lives = 20;
    score.textContent = 20;
    isGameOver = false;
    secretNumber = generateSecretNumber();
    number.textContent = "?";
    msg.textContent = `Start guessing...`;

    console.log(secretNumber);
  }
});

function generateSecretNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

function updateHighScore(lives) {
  if (Number(highScore.textContent) < lives) {
    highScore.textContent = lives;
    number.textContent = secretNumber;
  }
}
