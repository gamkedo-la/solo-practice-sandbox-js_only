let canvas, canvasContext; // save the canvas for dimensions, and its 2d context for drawing to it

// ball variables
let ballX = 75, ballY = 75; // track of ball position
let ballSpeedX =6, ballSpeedY = 8;

// paddle position variables
const PADDLE_WIDTH = 10, PADDLE_HEIGHT = 100;

let paddle1X = 0, paddle1Y=250;
let paddle2Y = 250; 



function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.left - root.scrollTop;
  
  return {x:mouseX, y:mouseY};
}

window.onload = function(){
  // window.onload gets run automatically when the page finishes loading

  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // these next lines set up our game logic and render to happen 30 times per second
  let framesPerSecond = 30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener("mousemove", function(evt) {
    let mousePos = calculateMousePos(evt);
    paddle2Y = mousePos.y - (PADDLE_HEIGHT/2); 
  });
}

function ballReset(){
  // center the ball on the canvas
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
}

function moveEverything(){
  if(ballX < 0){ // if ball has moved beyond the left edge
    if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
      ballSpeedX *= -1; // reverse ball direction along x-axis
    }else{ 
      ballReset();
    }
  }

  if(ballX > canvas.width){ // if ball has moved beyond the right edge
    ballSpeedX *= -1; // reverse ball direction along x-axis
  }

  if(ballY < 0){ // if ball has moved beyond the top edge
    ballSpeedY *= -1; // reverse ball direction along y-axis
  }

  if(ballY > canvas.height){ // if ball has moved beyond the bottom edge
    ballSpeedY *= -1; // reverse ball direction along y-axis 
  }

  ballX += ballSpeedX; // move the ball based on its current horizontal speed
  ballY += ballSpeedY; // move the ball based on its current vertical speed
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
function colorCircle(centerX, centerY, radius, fillColor){  
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY,radius,0,Math.PI*2, true);
  canvasContext.fill();
}

function drawEverything() { 
  colorRect(0,0,canvas.width,canvas.height,"#000000"); // clear the game view by filling it with black

  // draw a paddle for player1 (left side)
  colorRect(paddle1X,  paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "#ffffff");
  // draw a paddle for player2 (right side)
  colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT,"#ffffff");

  // draw a white circle (ball)
  colorCircle(ballX, ballY, 10, "#ffffff");
}

/*
continue on page 74 of file:///C:/Users/simon/Downloads/Hands-On%20Intro%20to%20Game%20Programming%20textbook%20and%20code%20(more%20game%20types)/Hands-On%20Intro%205/Hands-On%20Intro%20to%20Game%20Programming-v5.pdf
*/