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

//*****************************************************************************/
//***                           JS and CSS Styles                           ***/
//*****************************************************************************/

//  create handle, use style, pick a property to change and apply the style in " "
//
//  document.querySelector("body").style.backgroundColor = "#60b347";
//  document.querySelector(".number").style.width = "30rem";
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

const instructions = document.querySelector(".instructions");
const instructionModal = document.querySelector(".instruction-modal");
const instructionsModalExit = document.querySelector(".close-icon");
const modalOverlay = document.querySelector(".modal-overlay");

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
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
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
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
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

instructions.addEventListener("click", function () {
  instructionModal.classList.toggle("hidden");
});

instructionsModalExit.addEventListener("click", function () {
  instructionModal.classList.toggle("hidden");
});

modalOverlay.addEventListener("click", function () {
  instructionModal.classList.toggle("hidden");
});

document.addEventListener("keydown", function (e) {
  //    e is for event, aka, pass in the event object to the next function
  //    console.log(e); // Shows the properties of the event
  //    console.log(e.key);

  if (e.key === "Escape" && !instructions.classList.contains("hidden")) {
    instructionModal.classList.add("hidden");
  }
});
