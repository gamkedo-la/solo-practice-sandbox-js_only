// canvas variables
let canvas, canvasContext;

let blueWarrior = new warriorClass();

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  loadImages();
}

function imageLoadingDoneSoStartGame(){
  let framesPerSecond = 30; 
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

  loadLevel(levelOne);
}

function loadLevel(whichLevel){
  worldGrid = whichLevel.slice();
  blueWarrior.reset(blueWarriorPic, "Blue Player");
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  blueWarrior.move();
}

function drawAll() {
  drawWorlds();
  blueWarrior.draw();
}    
