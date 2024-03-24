const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const hapje = new Audio("hapSnake.mp4");

// eigen input + button
let naam;

document.getElementById("OK").onclick = function(){
  naam = document.getElementById("tekst").value;
  document.getElementById("H1").textContent = `Welkom bij Snake, ${naam}!`
}


class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 10;

// raster
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

// slang zelf
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;


let appleX = 5;
let appleY = 5;

// X en Y 
let inputsXVelocity = 0;
let inputsYVelocity = 0;

let score = 0;

// geluid wanneer slang eet?


// looping van spel: stopt soms
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  // moet slang sneller worden/punt?)
  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 10;
  }

  setTimeout(drawGame, 1000 / speed);
}

// game over sectie
function isGameOver(){
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //muurtjes
  if (headX <0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY <0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i <snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";

ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
}

ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
}

return gameOver;
}
// einde game over sectie

function drawScore() {
ctx.fillStyle = "white";
ctx.font = "10px Verdana";
ctx.fillText("Score " + score, canvas.width - 398, 10);
}

// na game over?
function clearScreen() {
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
ctx.fillStyle = "green";
for (let i = 0; i <snakeParts.length; i++) {
let part = snakeParts[i];
ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
}

snakeParts.push(new SnakePart(headX, headY)); 
while (snakeParts.length > tailLength) {
snakeParts.shift();
}

ctx.fillStyle = "purple";
ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// RICHTING
function changeSnakePosition() {
headX = headX + xVelocity;
headY = headY + yVelocity;
}

function drawApple() {
ctx.fillStyle = "red";
ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
if (appleX === headX && appleY == headY) {
appleX = Math.floor(Math.random() * tileCount);
appleY = Math.floor(Math.random() * tileCount);
tailLength++;
score++;
hapje.play();
}
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
//naar boven
if (event.keyCode == 38 || event.keyCode == 87) {

if (inputsYVelocity == 1) return;
inputsYVelocity = -1;
inputsXVelocity = 0;
}

//omlaag
if (event.keyCode == 40 || event.keyCode == 83) {

if (inputsYVelocity == -1) return;
inputsYVelocity = 1;
inputsXVelocity = 0;
}

//links
if (event.keyCode == 37 || event.keyCode == 65) {

if (inputsXVelocity == 1) return;
inputsYVelocity = 0;
inputsXVelocity = -1;
}

//rechts
if (event.keyCode == 39 || event.keyCode == 68) {

if (inputsXVelocity == -1) return;
inputsYVelocity = 0;
inputsXVelocity = 1;
}
}

drawGame();
