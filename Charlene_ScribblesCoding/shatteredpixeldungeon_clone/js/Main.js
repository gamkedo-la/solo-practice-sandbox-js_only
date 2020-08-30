// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  menu();

  canvas.addEventListener('click', function(e) {
    loadImages();
  });
}

function menu() {
  canvasContext.font = "48px serif";
  canvasContext.fillStyle = "black";
  canvasContext.fillText("Welcome to Shattered Pixel Dungeon clone!", 20, 200);
  canvasContext.fillText("Dungeon clone!", 200, 250);
  canvasContext.font = "30px serif";
  canvasContext.fillText("Click anywhere to start playing", 180, 300);
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  p1.init(playerPic, "Blue");
  initInput();  
}

function moveEverything() {
  p1.move();
}

function drawEverything() {
  drawRoom();
  p1.draw();
}