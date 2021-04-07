let ballX = 75, ballY = 75; //variables to track of ball position
let ballSpeedX =6, ballSpeedY = 6;

let canvas, canvasContext; // save the canvas for dimensions, and its 2d context for drawing to it

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
}

function moveEverything(){
  if(ballX > canvas.width){ // if ball has moved beyond the right edge
    ballSpeedX *= -1; // move the ball based on its current horizontal speed
  }else if(ballX < 0){ 
    ballSpeedX *= -1;
  }
  if(ballY > canvas.height){ // if ball has moved beyond the right edge
    ballSpeedY *= -1; // move the ball based on its current horizontal speed
  }else if(ballY < 0){ 
    ballSpeedY *= -1;
  }


  ballX += ballSpeedX; // move the ball to the right by a small increment
  ballY += ballSpeedY; // move the ball down by a small increment
}

function drawEverything() { 
  // clear the game view by filling it with black
  canvasContext.fillStyle = "#000000";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height); // x,y 0,0 origin, or the top-left of the canvas. Max being 800,600 bottom-right corner

  // draw a white circle
  canvasContext.fillStyle = "#ffffff"
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY,10,0,Math.PI*2, true);
  canvasContext.fill();
}


/*
continue on page 53 of file:///C:/Users/simon/Downloads/Hands-On%20Intro%20to%20Game%20Programming%20textbook%20and%20code%20(more%20game%20types)/Hands-On%20Intro%205/Hands-On%20Intro%20to%20Game%20Programming-v5.pdf
*/