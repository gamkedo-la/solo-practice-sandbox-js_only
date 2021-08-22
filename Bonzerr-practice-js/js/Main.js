var canvas, canvasContext;
var blueHero = new heroClass();
var particles = new ballClass();

var ghostX=75;
var ghostY=75;
var ghostSpeedX = 5;
var ghostSpeedY =7;


function ghostReset(){
   ghostX=canvas.width/2;
   ghostY = canvas.height/1.5;
}

function ghostMove() {
  ghostX += ghostSpeedX;
  if (ghostX < 0 && ghostSpeedX < 0.0) { //left side
      ghostSpeedX *= -1;

  }
  if (ghostX > canvas.width && ghostSpeedX > 0.0) { // right side
      ghostSpeedX *= -1;

  }
  ghostY += ghostSpeedY;
  if (ghostY < 0 && ghostSpeedY < 0.0) { //top edge
      ghostSpeedY *= -1;

  }
  // if (ghostY > canvas.height) { //bottom of the screen
  //     ghostReset();
    
  //     ghostSpeedY *= -1;
  // }
   if (ghostY > canvas.height) { //bottom of the screen
    
  
    ghostSpeedY *= -1;
    // ghostReset();
   }

}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath(); //hover functions 
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true); // this will work because the Math.PI * 2 will never change  nor the other lines and this is just simplifying things for us.  
  canvasContext.fill();

}


window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  colorRect(0, 0, canvas.width, canvas.height, "black");
  colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white");
  
  loadImages();
  ghostReset();
};

function imageLoadingDoneSoStartGame() {
  var framesPersecond = 30;
  setInterval(updateAll, 1000 / framesPersecond);
  setupInput();
  var audio = new Audio("Intro-BeepBox-Song.wav");
  audio.play();
  loadLevel(levelList[levelNow]);
  // worldGrid = levelOne;
  // blueCar.reset(otherCarPic, "Machine Raider");
  // blueHero.reset(heroPic, "Black Fire");
}

function nextLevel() {
  levelNow++;
  if (levelNow >= levelList.length) {
    levelNow = 0;
  }
  loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {
  worldGrid = whichLevel.slice();
  // blueCar.reset(otherCarPic, "Machine Raider");
  blueHero.reset(heroPic, "Black Fire");

  //worldGrid[30] = 5;
  //console.log(whichLevel[30]);
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  blueHero.move();
  ghostMove();
 
}

function drawAll() {
  drawTracks();
  blueHero.draw();
  colorCircle(ghostX, ghostY, 18, 'black');
  colorCircle(ghostX, ghostY, 12, 'red');
  colorCircle(ghostX+2, ghostY, 5, 'white');
  colorCircle(ghostX, ghostY, 2, 'black');
  
 
}

