let canvas, canvasContext; // save the canvas for dimensions, and its 2d context for drawing to it

let lassoX1 = 0, lassoY1 = 0, lassoX2 = 0, lassoY2 = 0; // for lasso dragging selection
let isMouseDragging = false;

const PLAYER_START_UNITS = 20;

let playerUnits = []; // declaring an array
let selectedUnits = []; 
const MIN_DIST_TO_COUNT_DRAG = 10;

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.left - root.scrollTop;
  
  return {x:mouseX, y:mouseY};
}

function mouseMovedEnoughToTreatAsDrag() {
  let deltaX = lassoX1 - lassoX2;
  let deltaY = lassoY1 - lassoY2;
  let dragDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  return (dragDist > MIN_DIST_TO_COUNT_DRAG);
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

    if(mouseMovedEnoughToTreatAsDrag()) {
      selectedUnits = []; // clear the selection array

      for(let i = 0; i < playerUnits.length; i++) {
        if(playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
          selectedUnits.push(playerUnits[i]);
        }
      }
      document.getElementById("debugText").innerHTML = "Selected " + selectedUnits.length + " units";
    } else { // mouse didn't move far, treat as click for move command
      let mousePos = calculateMousePos(evt);
      let unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length + 2));
      for(let i = 0; i < selectedUnits.length; i++) {
        selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
      }
      document.getElementById("debugText").innerHTML = "Moving to (" + mousePos.x + ", " + mousePos.y + ")";
    }
  });

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
  colorRect(0, 0, canvas.width, canvas.height, "#000000"); // clear the game view by filling it with black

  for(let i = 0; i < playerUnits.length; i++){
    playerUnits[i].draw();
  }

  for(let i = 0; i < selectedUnits.length; i++){
    selectedUnits[i].drawSelectionBox();
  }

  if(isMouseDragging) {
    coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow');
  }
}