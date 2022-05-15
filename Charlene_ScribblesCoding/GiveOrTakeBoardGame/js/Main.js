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
var menu = new Image();
menu.src = "assets/tutorial.png";

// player board position
const PLAYER_1_BOARD = {x: 12, y: 7}
const PLAYER_2_BOARD = {x: 299, y: 7}
const PLAYER_3_BOARD = {x: 12, y: 289}
const PLAYER_4_BOARD = {x: 299, y: 289}

// assets
var sun = new Image();
sun.src = "assets/sun_card.png";
var heart = new Image();
heart.src = "assets/heart_card.png";
var crown = new Image();
crown.src = "assets/crown_card.png";
var rat = new Image();
rat.src = "assets/rat_card.png";
var snake = new Image();
snake.src = "assets/snake_card.png";

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

function menuScreen() {
  isMenu = false;
  isGameStarted = true;
  console.log("isMenu: " + isMenu + ", isGameStarted: " + isGameStarted)
}

function setAI() {
  set2Players();
}

function set4Players() {
  numOfPlayers = 4;
  document.getElementById("debug").innerHTML = numOfPlayers + " players";
  appearCardQuestion();
  playerScoreArray = [0, 0, 0, 0]
}

function set3Players() {
  numOfPlayers = 3;
  document.getElementById("debug").innerHTML = numOfPlayers + " players";
  appearCardQuestion();
  playerScoreArray = [0, 0, 0]
}

function set2Players() {
  numOfPlayers = 2;
  document.getElementById("debug").innerHTML = numOfPlayers + " players";
  appearCardQuestion();
  playerScoreArray = [0, 0]
}

function set4Cards() {
  numOfTurns = 4;
  document.getElementById("player_controller").style.display = "none";
  isMenu = true;
  isGameStarted = true;
}

function set8Cards() {
  numOfTurns = 8;
  document.getElementById("player_controller").style.display = "none";
  isMenu = true;
  isGameStarted = true;
}

function set12Cards() {
  numOfTurns = 12;
  document.getElementById("player_controller").style.display = "none";
  isMenu = true;
  isGameStarted = true;
}

function set24Cards() {
  numOfTurns = 24;
  document.getElementById("player_controller").style.display = "none";
  isMenu = true;
  isGameStarted = true;
}

function set48Cards() {
  numOfTurns = 48;
  document.getElementById("player_controller").style.display = "none";
  isMenu = true;
  isGameStarted = true;
}

function appearCardQuestion() {
  let div = document.getElementById("player_controller")
  div.innerHTML=`<p>How many cards do you want to play?</p> <button class=\"btn\" onclick=\"set4Cards()\">4</button> <button class=\"btn\" onclick=\"set8Cards()\">8</button> <button class=\"btn\" onclick=\"set12Cards()\">12</button> <button class=\"btn\" onclick=\"set24Cards()\">24</button> <button class=\"btn\" onclick=\"set48Cards()\">48</button>`
}

function handleClick(e) {
  var randomize = Math.floor(Math.random() * 20) + 1; // get a number between 1 - 20
  var cardType;
  var pos = getMousePos(e);
  posX = pos.x;
  posY = pos.y;

  if (!isMenu) {
    // set the game points
    if (randomize <= 4) { // 1 - 4
      scorePoint = -2
      cardType = snake
    } else if (randomize >= 5 && randomize <= 11) { // 5 - 11
      scorePoint = -1
      cardType = rat
    } else if (randomize >= 12 && randomize <= 15) { // 12 - 15
      scorePoint = 1
      cardType = heart
    } else if (randomize >= 16 && randomize <= 19) { // 16 - 19
      scorePoint = 5
      cardType = crown
    } else { // 20 - jackpot score!
      scorePoint = 10
      cardType = sun
    }
  
    if (!isGameOver && isGameStarted) {
      console.log("posX: " + posX + ", posY: " + posY)
      if (currentTurn < numOfPlayers) {
        if (posX > 12 && posX < 240) { // posX is at left boards, either player 1 or 3
          if (posY > 5 && posY < 250) { // posY is on top left board - player 1
            playerScoreArray[0] += scorePoint;
            cardArray.push({ card: cardType, x: posX, y: posY });
            turns++;
          } else if (posY > 285 && posY < 530) { // posY is on bottom left board - player 3
            if (numOfPlayers >= 3) {
              playerScoreArray[2] += scorePoint;
              cardArray.push({ card: cardType, x: posX, y: posY });
              turns++;
            }
          }
        } else if (posX > 275 && posX < 530) { // posX is at right boards, either 2 or 4
          if (posY > 7 && posY < 250) { // posY is on top right board - player 2
            if (numOfPlayers >= 2) {
              playerScoreArray[1] += scorePoint;
              cardArray.push({ card: cardType, x: posX, y: posY });
              turns++;
            }
          } else if (posY > 285 && posY < 530) { // posY is on bottom right board - player 4
            if (numOfPlayers >= 4) {
              playerScoreArray[3] += scorePoint;
              cardArray.push({ card: cardType, x: posX, y: posY });
              turns++;
            }
          }
        }
        // playerScoreArray[currentTurn] += scorePoint;
      } else {
        currentTurn = 0;
        playerScoreArray[currentTurn] += scorePoint;
      }  
    }
  
    document.getElementById("debug").innerHTML = "Player " + currentTurn + " scored " + scorePoint + " points!";
  } else {
    isMenu = false;
  }
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

  for (let i = 0; i <= playerScoreArray.length; i++) {
    if (winningPoints == playerScoreArray[i]) {
      winner = i + 1;
    }
  }

  canvasContext.font = '36px serif';
  canvasContext.fillText("Winner: Player " + winner + "!", 200, 290);

  document.getElementById("debug").innerHTML = "Game Over! Winner: Player " + winner + "!";
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
    if (cardArray[i].card === rat) {
      drawPicture(cardArray[i].card, cardArray[i].x, cardArray[i].y, 50, 50);
    } else if (cardArray[i].card === snake || cardArray[i].card === sun) {
      drawPicture(cardArray[i].card, cardArray[i].x, cardArray[i].y, 60, 60);
    } else {
      drawPicture(cardArray[i].card, cardArray[i].x, cardArray[i].y, 60, 40);
    }
  }

  // print all players score
  for (let i = 0; i < numOfPlayers; i++) {
    var msg = 'Player ' + (i+1) + '\'s score: ' + playerScoreArray[i];

    canvasContext.font = '18px serif';
    canvasContext.fillText(msg, 590, 500 + (i * 20));
  }

  if (isMenu) {
    drawPicture(menu, 75, 75, 650, 450);
  }
}