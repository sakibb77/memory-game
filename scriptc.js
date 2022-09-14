"use strict";

let arr1 = [1, 2];
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
let arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const towByTwo = document.querySelector("#two-by-two");
const fourByFour = document.querySelector("#four-by-four");
const sixBySix = document.querySelector("#six-by-six");
const gameBox = document.querySelector(".game-box");
const move = document.querySelector("#move-count-number");
let moveCount = 0;

let dblArr;
let shuffleArray;

function clickCard() {
  const box = document.querySelectorAll(".game-img");
  box.forEach(function (card) {
    card.addEventListener("click", filpCard);
  });
}

function gameBoxSize(number) {
  gameBox.style.grid = `repeat(${number}, 1fr) / repeat(${number}, 1fr)`;
}

// 2*2 lavele chenge
towByTwo.addEventListener("click", function () {
  dblArr = [...arr1, ...arr1];
  shuffleArray = shuffle(dblArr);
  gameBoxSize(2);
  fillBox();
  clickCard();
  move.textContent = 0;
});

// 4*4 lavele chenge
//lavele four by four automatic call whene window refresh
function fourLevel() {
  dblArr = [...arr2, ...arr2];
  shuffleArray = shuffle(dblArr);
  gameBoxSize(4);
  fillBox();
  clickCard();
  move.textContent = 0;
}
fourLevel();
//lavele four by four call whene click 4 * 4 button
fourByFour.addEventListener("click", fourLevel);
// 6*6 lavele chenge
//lavele four by four call whene click 4 * 4 button
sixBySix.addEventListener("click", function () {
  dblArr = [...arr3, ...arr3];
  shuffleArray = shuffle(dblArr);
  gameBoxSize(6);
  fillBox();
  clickCard();
  move.textContent = 0;
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function fillBox() {
  const gameBox = document.querySelector(".game-box");
  gameBox.innerHTML = `${shuffleArray
    .map(function (element) {
      return `
      <div class="game-img">
        <div class="front">
          <h1></h1>
        </div>
        <div class="back">
          <h1>${element}</h1>
        </div>
        </div>
      `;
    })
    .join("")}`;
}

let cardFliped = false;
let lockBoard = false;
let firstCard, secondCard;

function filpCard() {
  if (lockBoard) return;
  this.children[0].classList.toggle("front-flip");
  this.children[1].classList.toggle("back-flip");

  if (!cardFliped) {
    cardFliped = true;
    firstCard = this;
  } else {
    cardFliped = false;
    secondCard = this;

    //check match in this function
    checkMatch();
    //count move count
    moveCount++;
    move.textContent = moveCount;
  }
}

//check match
function checkMatch() {
  let fistCardValue = firstCard.children[1].innerText ?? 0;
  let secondCardValue = secondCard.children[1].innerText ?? 1;

  lockBoard = true;
  setTimeout(function () {
    if (fistCardValue != secondCardValue) {
      //firstcard and second card not match then car flip again
      removeClass();
    } else {
      //while firstcard and second card match then card event listener remover on these element
      removeClickEvent();
    }
    lockBoard = false;
  }, 800);
}
///////////////////////////////////////

/////////////////////////////
// card class remove function
function removeClass() {
  firstCard.children[0].classList.remove("front-flip");
  firstCard.children[1].classList.remove("back-flip");
  secondCard.children[0].classList.remove("front-flip");
  secondCard.children[1].classList.remove("back-flip");
}

// card remove event listener function
function removeClickEvent() {
  firstCard.removeEventListener("click", filpCard);
  secondCard.removeEventListener("click", filpCard);
}

const playAgainBtn = document.querySelector("#play-again");

playAgainBtn.addEventListener("click", playAgain);
//play again
function playAgain() {
  const move = document.querySelector("#move-count-number");
  const gameBox = document.querySelector(".game-box");
  gameBox.innerHTML = "";
  moveCount = 0;
  move.textContent = moveCount;
}
