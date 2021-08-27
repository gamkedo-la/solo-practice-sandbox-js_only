// canvas variables
let canvas, canvasContext;

let p1 = new warriorClass();
let p2 = new enemyClass();

window.onload = function(){
  // game canvas
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();
}

function loadingDoneSoStartGame() {
  // set up our game logic and render to happen 30 times per second
  let framesPerSecond = 30;
  setInterval(function(){ 
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  p1.init(playerPic, "Blue");
  p2.init(enemyPic, "Green");
  initInput();
}

function moveEverything(){
  p1.move();
  p2.move();
}

function drawEverything(){
  // draw room
  drawRoom();

  // draw warrior
  p1.draw();
  p2.draw();
}

// page 246