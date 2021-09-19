var canvas, canvasContext;
var framesPerSecond = 30;

// background image
var backgroundImg = new Image();
backgroundImg.src = "assets/dummy_background.jpg";

// assets
var heartCard = new Image();
heartCard.src = "assets/heart_card.jpg";

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  canvas.addEventListener('click', function (e) {
    spawnCard();
  });

  setInterval(function () {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
}

function moveEverything() {

}

function spawnCard(evt) {
  // var pos = getMousePos(evt)

  drawPicture(heartCard, 5, 10, 100, 100)
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  var scaleY = canvas.height / rect.height;

  // account for the margins, canvas position on page, scroll amount, etc
  var mouseX = (evt.clientX - rect.left) * scaleX;
  var mouseY = (evt.clientY - rect.top) * scaleY;
  return {
    x: mouseX,
    y: mouseY
  };
}

function drawEverything() {
  // <-- background --> //
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  drawPicture(backgroundImg, 0, 0, 800, 600);
}