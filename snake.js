const grid = document.querySelector(".grid");
const gameContainer = document.querySelector(".container");
const scoreBox = document.querySelector(".score");
const controls = document.querySelectorAll(".controls i");
const gameOverBox = document.querySelector(".gameOver");
const tryAgainButton = document.querySelector(".gameOver--button");

let snakeBody = [];

const food = ["🐍", "🐇", "🐀", "🦚", "🐐", "🙅🏻‍♀️", "🐁", "🦎", "🙇🏽", "🐈‍", "🐏", "🦢"];
let emoji;

snakeX = 5;
snakeY = 5;

let foodX;
let foodY;
let score = 0;
let speed = 200;

let gameOver = false;

let movementX = 0;
let movementY = 0;

let interval;

scoreBox.innerHTML = `Your score: <b>${score}</b>`;

controls.forEach((button) => button.addEventListener("click", () => directionChange({ key: button.dataset.key })));

const foodUpdate = () => {
  foodX = Math.floor(Math.random() * 20) + 1;
  foodY = Math.floor(Math.random() * 20) + 1;
  const emojiIndex = Math.floor(Math.random() * food.length);
  emoji = food[emojiIndex];
};

const directionChange = (e) => {
  if (e.key === "ArrowLeft" || e.keyCode === "37") {
    movementY = 0;
    movementX = -1;
  } else if (e.key === "ArrowUp" || e.keyCode === "38") {
    movementY = -1;
    movementX = 0;
  } else if (e.key === "ArrowRight" || e.keyCode === "39") {
    movementY = 0;
    movementX = 1;
  } else if (e.key === "ArrowDown" || e.keyCode === "40") {
    movementY = 1;
    movementX = 0;
  }

  snakeGame();
};

const handleGameOver = () => {
  location.reload();
  clearInterval(interval);
  alert("GAME OVER, press OK to try again");
};

const snakeGame = () => {
  if (gameOver === true) return handleGameOver();

  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}">${emoji}</div>`;

  if (snakeX === foodX && snakeY === foodY) {
    foodUpdate();
    snakeBody.push([foodY, foodX]);
    score++;
    speed -= 5;
    scoreBox.innerHTML = `Your score: <b>${score}</b>`;
    speedUp();
  }
  snakeX += movementX;
  snakeY += movementY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY > 20) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }

  grid.innerHTML = html;
};

const speedUp = () => {
  clearInterval(interval);
  interval = setInterval(snakeGame, speed);
};

const startGame = () => {
  interval = setInterval(snakeGame, speed);
};

window.addEventListener("DOMContentLoaded", foodUpdate(), startGame());

document.addEventListener("keyup", directionChange);
