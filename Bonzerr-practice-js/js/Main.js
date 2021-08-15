var canvas, canvasContext;

var blueHero = new heroClass();
// var blueCar = new heroClass();
// var ball = new ballClass();


const START_BALLS = 40;
const GRAVITY_PER_CYCLE=0.1;

var remX = 300, remY = 200;
var remW = 300, remH = 200;


function ballClass() {
  this.x = 75;
  this.y = 75;
  this.velX = 5;
  this.velY = 7;
  this.readyToRemove = false;
  this.cyclesLeft = 100;
  this.myColor;

  this.move = function () {
    this.cyclesLeft--;

    if (this.cyclesLeft < 0) {
      this.readyToRemove = true;
    }

    this.velY += GRAVITY_PER_CYCLE;
    this.x += this.velX;
    this.y += this.velY;

    if (this.x < 0) {
      this.velX *= -1;
    }

    if (this.x > canvas.width) {
      this.velX *= -1;
    }

    if (this.y < 0) {
      this.velY *= -1;
    }

    if (this.y > canvas.height) {
      this.y -= this.velY;
      this.velY *= -0.3;
    }
  };

  this.draw = function () {
    colorCircle(this.x, this.y, (20 * this.cyclesLeft) / 130.0, this.myColor);
   
  };
}

var ballList = [];

function addBall() {
  var tempBall;
  tempBall = new ballClass();
  // tempBall.x = Math.random() * canvas.width; // gives us a horizontal position randmoly
  // tempBall.y = Math.random() * canvas.height;
  tempBall.x = 0.5 * canvas.width; // gives us a horizontal position randmoly
  tempBall.y = 0.5 * canvas.height;

  tempBall.velX = 5 - Math.random() * 10;
  tempBall.velY = 5 - Math.random() * 10;
  tempBall.cyclesLeft = 30 + Math.floor(Math.random() * 100);

  if (Math.random() < 0.5) {
    tempBall.myColor = "red";
  } else {
    tempBall.myColor = "yellow";
  }

  ballList.push(tempBall);
}

function removeBall() {
  for (var i = 0; i < ballList.length; i++) {
    if (
      ballList[i].x > remX &&
      ballList[i].x < remX + remW &&
      ballList[i].y > remY &&
      ballList[i].y < remY + remH
    ) {
      ballList[i].readyToRemove = true;
    }
  }
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  colorRect(0, 0, canvas.width, canvas.height, "black");
  colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white");
  
  for (var i =0; i< START_BALLS;i++){
    addBall();
  }

  loadImages();
  
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
  // blueCar.move();
}

function drawAll() {
  drawTracks();
  blueHero.draw();
  ball.draw();
 
  // blueCar.draw();
}

