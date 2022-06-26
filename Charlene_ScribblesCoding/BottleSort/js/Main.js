var canvas, canvasContext;
var framesPerSecond = 30;

var cardArray = [];
var spawnCounter = 0;
var isGameOver = false;
var isGameStarted = false;
var isMenu = false;
var numOfTurns = 12;
var turns = 0;
var round = 1;
var scorePoint;
var versusAI = false;

var playersBoard = [];
var numOfPlayers;
var playerScoreArray = [];
var currentTurn = 0;

var winner;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  canvas.addEventListener('click', handleClick);

  setInterval(function () {
      moveEverything();
      drawEverything();
  }, 1000 / framesPerSecond);
}

function moveEverything() {
  if (turns == numOfTurns) {
    isGameOver = true;
  }
}

function menuScreen() {
  
}

function handleClick(e) {
  var randomize = Math.floor(Math.random() * 20) + 1; // get a number between 1 - 20
  var cardType;
  var pos = getMousePos(e);
  posX = pos.x;
  posY = pos.y;
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  var scaleY = canvas.height / rect.height;

  // account for the margins, canvas position on page, scroll amount, etc
  var mouseX = (evt.clientX - rect.left - 30) * scaleX;
  var mouseY = (evt.clientY - rect.top - 20) * scaleY;
  return {
    x: mouseX,
    y: mouseY
  };
}

function gameOverScreen() {
  var winningPoints = playerScoreArray.reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);
  
  canvasContext.font = '36px serif';
  canvasContext.fillText("Game over!");

  for (let i = 0; i <= playerScoreArray.length; i++) {
    if (winningPoints == playerScoreArray[i]) {
      winner = i + 1;
    }
  }
}

function drawEverything() {
  // <-- background --> //
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}