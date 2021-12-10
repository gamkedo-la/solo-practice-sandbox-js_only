let canvas, canvasContext; // save the canvas for dimensions, and its 2d context for drawing to it

let testUnit = new unitClass();

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
    document.getElementById("debugText").innerHTML = "("+mousePos.x+", "+mousePos.y+")";
  });

  canvas.addEventListener('click', function(evt) {
    let mousePos = calculateMousePos(evt);
    testUnit.gotoX = mousePos.x;
    testUnit.gotoY = mousePos.y;
  });

  testUnit.reset();
}

function moveEverything(){
  testUnit.move();
}

function drawEverything() { 
  colorRect(0,0,canvas.width,canvas.height,"#000000"); // clear the game view by filling it with black

  testUnit.draw();
}