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

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  canvas.addEventListener('click', spawnCard);

  setInterval(function () {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
}

function moveEverything() {

}

function spawnCard(e) {
  var pos = getMousePos(e);
  posX = pos.x;
  posY = pos.y;

  heartCardArray.push({x: posX, y: posY});
  console.log(heartCardArray);
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

function drawEverything() {
  // <-- background --> //
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  drawPicture(backgroundImg, 0, 0, 800, 600);

  for (let i = spawnCounter; i < heartCardArray.length; i++) {
    drawPicture(heartCard, heartCardArray[i].x, heartCardArray[i].y, 100, 100);
  }
}