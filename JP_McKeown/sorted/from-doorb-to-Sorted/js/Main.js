// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

const MEEPS = 12;
var meep = [];
var p1 = new herderClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  loadImages();
  checkGridMatchColRow();
}

function loadingDoneSoStartGame() {

  p1.init(playerPic, "Blue piper");

  for(var i=0; i < MEEPS; i++) {
    // test with initial colours
    var colorChoice = randomRangeInt(1, 2);
    if (colorChoice == 0) {
      color = 'white';
    } else if (colorChoice == 1) {
      color = 'blue';
      // this.img = blueSheepPic;
    } else if (colorChoice == 2) {
      color = 'red';
      // this.img = redSheepPic;
    }
    var spawnUnit = new meepClass();
    spawnUnit.init(i, color);
    meep.push(spawnUnit);
  } 

  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
     
  initInput(); 

}

function moveEverything() {
  p1.move();
  for(var i=0; i < meep.length; i++) {
    meep[i].move();
  }
}

function drawEverything() {
  drawRoom();
  p1.draw();

  for(var i=0; i < meep.length; i++) {
    meep[i].draw();
    meep[i].label();
  }
}