let ballX = 75, ballY = 75;

let canvas;
let canvasContext;

window.onload = function(){
  // window.onload gets rin automatically when the page finishes loading

  // save the canvas for dimensions, and its 2d context for drawing to it
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  setInterval(drawEverything, 1000);
}

function drawEverything() { 
  ballX += 50;
  console.log("ballX is now: " + ballX);
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