var ballSize = 20;
const hatHeight = 40;
const ballStartY = ballSize + hatHeight + 10;
const TILE_WIDTH = 40;
var targetX = 400; // canvas/2
var ballX, ballY;
var ballTeam = "silver";

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');

  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  colorRect(0,0, canvas.width,canvas.height, "white");
  ctx.strokeRect(1,1, canvas.width-1,canvas.height-1);

  ballX = canvas.width/2;
  ballY = canvas.height/2;

  var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  // canvas.addEventListener('mousemove', updateMousePos);
}

function updateAll() {
  switch (gameState) {
    case STATE_ARRIVAL:
      personArrives();
      break;
    case STATE_PLAY:
      moveAll();
      break;
  }
  drawAll();
}

function moveAll() {
  if(keyHeld_TurnLeft) {
    targetX -= TILE_WIDTH;
  }
  if(keyHeld_TurnRight) {
    targetX += TILE_WIDTH;
  }
}

function drawAll() {
  // colorRect(0,0, canvas.width,canvas.height, "black");
  ctx.clearRect(0,0, canvas.width,canvas.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(1,1, canvas.width-1,canvas.height-1);

  switch (gameState) {
    case STATE_MENU:
      drawMenu();
      break;

    case STATE_ARRIVAL:
      drawPerson(ballX, ballY, ballTeam);
      drawHat(canvas.width/2, 10);
      break;

    case STATE_PLAY:
      drawPerson(canvas.width/2, ballStartY, ballTeam);
      drawHat(canvas.width/2, 10);
      drawTarget(targetX, canvas.height-TILE_WIDTH/2);
      break;
  } 
}

function drawMenu() {
  const MENU_X = 100;
  const MENU_Y = 100;
  const HEADING_SIZE = 40;
  const MENU_SIZE = 20;
  colorText('Pigeonhole', MENU_X, MENU_Y, HEADING_SIZE, 'white');
  colorText('Start', MENU_X, MENU_Y+80, MENU_SIZE, 'white');
  colorText('Level select', MENU_X, MENU_Y+140, MENU_SIZE, 'white');
  colorText('Options', MENU_X, MENU_Y+200, MENU_SIZE, 'white');
  colorText('Credits', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
  console.log('menu drawn')
}

function drawPerson(x,y, ballTeam) {
  ctx.save();
  if (ballTeam == "blue") {
    ctx.shadowColor="rgba(0,0,255,0.5)";
  } else if (ballTeam == "red") {
    ctx.shadowColor="rgba(255,0,0,0.5)";
  } else {
    ctx.shadowColor="rgba(192,192,192,0.5)";
  }
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur= 5;
  colorCircle(x,y, ballSize, ballTeam);
  ctx.restore();
}

function drawHat(x,y) {
  ctx.save();
  ctx.fillStyle = 'purple';
  ctx.shadowColor="rgba(100,0,100,0.5)";
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur= 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x-ballSize-5, y+47);
  ctx.lineTo(x+ballSize+5, y+47);
  ctx.moveTo(x, y-TILE_WIDTH/2);
  ctx.fill();
  ctx.restore();
}

// aiming target
function drawTarget(x,y) {
  ctx.save();
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x-TILE_WIDTH/2, y);
  ctx.lineTo(x+TILE_WIDTH/2, y);
  ctx.moveTo(x, y-TILE_WIDTH/2);
  ctx.lineTo(x, y+TILE_WIDTH/2, y);
  ctx.stroke();
  ctx.restore();
}

// bipolar receptacles at far side of screen
function drawHoles() {

}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	ctx.fill();
}

function colorText(showWords, textX,textY, fontSize, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.font = fontSize + 'px Arial';
	ctx.fillText(showWords, textX, textY);
}

function personArrives() {
    ballY -= 5;
    if(ballY < ballStartY) {
      ballY = ballStartY;
      ballTeam = Math.random() < 0.5 ? "blue" : "red"; 
      gameState = STATE_PLAY;
    }
}