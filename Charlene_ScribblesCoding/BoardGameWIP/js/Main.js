var canvas, canvasContext;
var framesPerSecond = 30;

// background image
var backgroundImg = new Image();
backgroundImg.src = "assets/dummy_background.jpg";

// assets
var heartCard = new Image();
heartCard.src = "assets/heart_card.png";

var heartCardArray = [];
var spawnCounter = 0;
var isGameOver = false;
var isGameStarted = false;
var players;
var numOfPlayers;
var numOfTurns = 12;
var turns = 0;
var round = 1;

var playerScoreArray = [];
var currentTurn = 0;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  canvas.addEventListener('click', spawnCard);

  setInterval(function () {
    if (!isGameOver && isGameStarted) {
      moveEverything();
      drawEverything();
    } else if (isGameOver) {
      gameOverScreen();
    }
  }, 1000 / framesPerSecond);
}

function moveEverything() {
  if (turns == numOfTurns) {
    isGameOver = true;
  }
}

function set4Players() {
  numOfPlayers = 4;
  document.getElementById("debug").innerHTML = numOfPlayers + " players";
  document.getElementById("player_controller").style.display = "none";
  isGameStarted = true;
  playerScoreArray = [0, 0, 0, 0]
}

function set3Players() {
  numOfPlayers = 3;
  document.getElementById("debug").innerHTML = numOfPlayers + " players";
  document.getElementById("player_controller").style.display = "none";
  isGameStarted = true;
  playerScoreArray = [0, 0, 0]
}

function set2Players() {
  numOfPlayers = 2;
  document.getElementById("debug").innerHTML = numOfPlayers + " players";
  document.getElementById("player_controller").style.display = "none";
  isGameStarted = true;
  playerScoreArray = [0, 0]
}

function set1Player() {
  numOfPlayers = 1;
  document.getElementById("debug").innerHTML = numOfPlayers + " player";
  document.getElementById("player_controller").style.display = "none";
  isGameStarted = true;
  playerScoreArray = [0]
}

function spawnCard(e) {
  var pos = getMousePos(e);
  posX = pos.x;
  posY = pos.y;

  if (!isGameOver && isGameStarted) {
    heartCardArray.push({x: posX, y: posY});
    turns++;
    
    if (currentTurn !== numOfPlayers) {
      playerScoreArray[currentTurn] += 1;
      currentTurn++;
    } else {
      currentTurn = 0;
      playerScoreArray[currentTurn] += 1;
      currentTurn++;
    }
  }
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  var scaleY = canvas.height / rect.height;

  // account for the margins, canvas position on page, scroll amount, etc
  var mouseX = (evt.clientX - rect.left - 50) * scaleX;
  var mouseY = (evt.clientY - rect.top - 50) * scaleY;
  return {
    x: mouseX,
    y: mouseY
  };
}

function gameOverScreen() {
  canvasContext.font = '36px serif';
  canvasContext.fillText("Game over! " + numOfTurns + " heart cards on board!", 70, 90);
  document.getElementById("debug").innerHTML = "Game Over";
}

function drawEverything() {
  // <-- background --> //
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  drawPicture(backgroundImg, 0, 0, 800, 600);

  for (let i = spawnCounter; i < heartCardArray.length; i++) {
    drawPicture(heartCard, heartCardArray[i].x, heartCardArray[i].y, 100, 100);
  }

  // print all players score
  for (let i = 0; i < numOfPlayers; i++) {
    var msg = 'Player ' + (i+1) + '\'s score: ' + playerScoreArray[i];

    canvasContext.font = '18px serif';
    canvasContext.fillText(msg, 590, 500 + (i * 20));
  }
}