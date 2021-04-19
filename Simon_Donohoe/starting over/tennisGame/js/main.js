let canvas, canvasContext; // save the canvas for dimensions, and its 2d context for drawing to it

// ball variables
let ballX = 75, ballY = 75; // track of ball position
let ballSpeedX =6, ballSpeedY = 8;

// paddle position variables
const PADDLE_WIDTH = 10, PADDLE_HEIGHT = 100;

const COMPUTER_PADDLE_SPEED = 6;
// scoreboard
let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;
let showTheWinner = false;

let paddle1X = 0, paddle1Y=250;
let paddle2Y = 250; 

console.log(paddle1Y);
    console.log(paddle2Y);

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.left - root.scrollTop;
  
  return {x:mouseX, y:mouseY};
}

function handleMouseClick(evt) {
  if(showTheWinner) {
    // scoreboardReset();
    player1Score = 0;
    player2Score = 0;
    ballReset();
    
    showTheWinner = false;
  }
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
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2); 
    // paddle2Y = mousePos.y - (PADDLE_HEIGHT/2); 
    
  });
  canvasContext.textAlign	=	'center';
}

function ballReset(){
  if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
    showTheWinner = true;
  }
  // center the ball on the canvas
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
}

// function scoreboardReset(){
//   player1Score = 0, player2Score = 0;
// }

function moveEverything(){
  if(showTheWinner){
    return;
  }

  moveComputerPaddle();

  if(ballX < 0){ // if ball has moved beyond the left edge
    if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
      ballSpeedX *= -1; // reverse ball direction along x-axis

      let reboundAngleY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
      ballSpeedY = reboundAngleY * 0.3;
    }else{ 
      player2Score += 1;
      ballReset();
    }
  }

  if(ballX > canvas.width){ // if ball has moved beyond the right edge
    if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
      ballSpeedX *= -1; // reverse ball direction along x-axis

      let reboundAngleY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
      ballSpeedY = reboundAngleY * 0.3;
    }else{ 
      player1Score += 1;
      ballReset();
    }
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

function moveComputerPaddle(){
  // computer ai center of paddle
  let paddle2Center = paddle2Y + (PADDLE_HEIGHT/2);

  // computer ai deadzone
  const COMPUTER_PLAYER_DEADZONE = 35;
  let topDeadZone = paddle2Center - COMPUTER_PLAYER_DEADZONE;
  let bottomDeadZone = paddle2Center + COMPUTER_PLAYER_DEADZONE;

  if(ballY < topDeadZone){
    paddle2Y = paddle2Y - COMPUTER_PADDLE_SPEED;
  }else if(ballY > bottomDeadZone){
    paddle2Y = paddle2Y + COMPUTER_PADDLE_SPEED;
  }
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

  if(showTheWinner){
    if(player1Score >= WINNING_SCORE){
      canvasContext.fillText("Player 1 wins by " + (player1Score - player2Score) + ".", canvas.width/2, canvas.height/2);
    }else if(player2Score >= WINNING_SCORE){
      canvasContext.fillText("Player 2 wins by " + (player2Score - player1Score) + ".", canvas.width/2, canvas.height/2);
    }
  }else{
    // draw a paddle for player1 (left side)
    colorRect(paddle1X,  paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "#ffffff");
    // draw a paddle for player2 (right side)
    colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT,"#ffffff");

    // draw a white circle (ball)
    colorCircle(ballX, ballY, 10, "#ffffff");
  }

  // draw a scoreboard
  canvasContext.fillText("Player 1  " + player1Score + "   " + player2Score + "  Player 2", canvas.width/2, 70);
  
  // start a new game if score is reached
  // if((player1Score >= WINNING_SCORE) || (player2Score >= WINNING_SCORE)){
  //   matchWinner();
  // }
}

/*
continue on page 83 of file:///C:/Users/simon/Downloads/Hands-On%20Intro%20to%20Game%20Programming%20textbook%20and%20code%20(more%20game%20types)/Hands-On%20Intro%205/Hands-On%20Intro%20to%20Game%20Programming-v5.pdf
*/