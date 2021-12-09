var canvas, canvasContext;
var framesPerSecond = 30;

// background image
var backgroundImg = new Image();
backgroundImg.src = "assets/board.jpg";
var playerBoardsOdd = new Image();
playerBoardsOdd.src = "assets/board_box_1_3.png";
var playerBoardsEven = new Image();
playerBoardsEven.src = "assets/board_box_2_4.png";
const PLAYER_BOARD_SIZE = 275;
// assets
var heart = new Image();
heart.src = "assets/heart_card.png";
var crown = new Image();
crown.src = "assets/crown_card.png";

var cardArray = [];
var spawnCounter = 0;
var isGameOver = false;
var isGameStarted = false;
var numOfTurns = 12;
var turns = 0;
var round = 1;
var scorePoint;

var playersBoard = [];
var numOfPlayers;
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
  var randomize = Math.floor(Math.random() * 11) + 1; // get a number between 1 - 10
  var cardType;
  var pos = getMousePos(e);
  posX = pos.x;
  posY = pos.y;

  if (randomize <= 5) {
    scorePoint = 1
    cardType = heart
  } else {
    scorePoint = 5
    cardType = crown
  }

  if (!isGameOver && isGameStarted) {
    let lessThanPosX = (PLAYER_BOARD_SIZE * currentTurn) + playersBoard[currentTurn].x
    let moreThanPosX = canvas.width - (PLAYER_BOARD_SIZE * (currentTurn + 1)) - playersBoard[currentTurn].x

    let lessThanPosY = (PLAYER_BOARD_SIZE * currentTurn) + playersBoard[currentTurn].y;
    let moreThanPosY = canvas.height - (PLAYER_BOARD_SIZE * (currentTurn + 1)) - 80

    if (posX > lessThanPosX && posX < moreThanPosX && posY > lessThanPosY && posY < moreThanPosY) {
      console.log("lessThanPosX = " + lessThanPosX)
      console.log("moreThanPosX = " + moreThanPosX)
      console.log("lessThanPosY = " + lessThanPosY)
      console.log("moreThanPosY = " + moreThanPosY)
      console.log("PosY is " + posY)

      if (currentTurn < numOfPlayers) {
        playerScoreArray[currentTurn] += scorePoint;
      } else {
        currentTurn = 0;
        playerScoreArray[currentTurn] += scorePoint;
      }
  
      cardArray.push({ card: cardType, x: posX, y: posY });
      turns++;
    }
  }

  document.getElementById("debug").innerHTML = "Player " + currentTurn + " scored " + scorePoint + " points!";
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
  canvasContext.fillText("Game over! " + numOfTurns + " cards on board!", 100, 250);

  document.getElementById("debug").innerHTML = "Game Over! Highest score: " + winningPoints + "!";
}

function drawEverything() {
  // <-- background --> //
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  drawPicture(backgroundImg, 0, 0, 800, 600);

  // <-- draw the player boards --> //
  for (let i = 1; i <= numOfPlayers; i++) {
    if (i == 1) {
      // player 1
      drawPicture(playerBoardsOdd, 10, 5, PLAYER_BOARD_SIZE, PLAYER_BOARD_SIZE)
      playersBoard.push({ x: 10, y: 5 });
    } else if (i == 2) {
      // player 2
      drawPicture(playerBoardsEven, 290, 5, PLAYER_BOARD_SIZE, PLAYER_BOARD_SIZE)
      playersBoard.push({ x: 290, y: 5 });
    } else if (i == 3) {
      // player 3
      drawPicture(playerBoardsEven, 10, 285, PLAYER_BOARD_SIZE, PLAYER_BOARD_SIZE)
      playersBoard.push({ x: 10, y: 285 });
    } else if (i == 4) {
      // player 4
      drawPicture(playerBoardsOdd, 290, 285, PLAYER_BOARD_SIZE, PLAYER_BOARD_SIZE)
      playersBoard.push({ x: 290, y: 285 });
    }
  }

  for (let i = spawnCounter; i < cardArray.length; i++) {
    drawPicture(cardArray[i].card, cardArray[i].x, cardArray[i].y, 60, 40);
  }

  // print all players score
  for (let i = 0; i < numOfPlayers; i++) {
    var msg = 'Player ' + (i+1) + '\'s score: ' + playerScoreArray[i];

    canvasContext.font = '18px serif';
    canvasContext.fillText(msg, 590, 500 + (i * 20));
  }
}