let canvas, canvasContext; // save the canvas for dimensions, and its 2d context for drawing to it

let lassoX1 = 0, lassoY1 = 0, lassoX2 = 0, lassoY2 = 0; // for lasso dragging selection
let isMouseDragging = false;

const PLAYER_START_UNITS = 10;

let playerUnits = []; // declaring an array

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
    if(isMouseDragging) {
      lassoX2 = mousePos.x;
      lassoY2 = mousePos.y;
    }
  });

  canvas.addEventListener("mousedown", function(evt) {
    let mousePos = calculateMousePos(evt);
    lassoX1 = mousePos.x;
    lassoY1 = mousePos.y;
    lassoX2 = lassoX1;
    lassoY2 = lassoY1;
    isMouseDragging = true;
  });

  canvas.addEventListener("mouseup", function(evt) {
    isMouseDragging = false;
  });

  // canvas.addEventListener('click', function(evt) {
  //  let mousePos = calculateMousePos(evt);
  //   for(let i = 0; i < playerUnits.length; i++) {
  //     playerUnits[i].gotoNear(mousePos.x, mousePos.y);
  //   }
  // }); 

  for(let i = 0; i < PLAYER_START_UNITS; i++){
    let spawnUnit = new unitClass();
    spawnUnit.reset();
    playerUnits.push(spawnUnit);
  }
}

function moveEverything(){
  for(let i = 0; i < playerUnits.length; i++){
    playerUnits[i].move();
  }
}

function drawEverything() { 
  colorRect(0,0,canvas.width,canvas.height,"#000000"); // clear the game view by filling it with black

  for(let i = 0; i < playerUnits.length; i++){
    playerUnits[i].draw();
  }

  if(isMouseDragging) {
    coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow');
  }
}