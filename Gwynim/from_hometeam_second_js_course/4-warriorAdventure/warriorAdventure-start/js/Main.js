// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  loadImages();
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