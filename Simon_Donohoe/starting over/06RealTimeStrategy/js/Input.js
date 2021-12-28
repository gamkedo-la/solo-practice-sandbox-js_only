let lassoX1 = 0, lassoY1 = 0, lassoX2 = 0, lassoY2 = 0; // for lasso dragging selection
let isMouseDragging = false;

let selectedUnits = []; 
const MIN_DIST_TO_COUNT_DRAG = 10;
const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;

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

function getUnitUnderMouse(currentMousePos) {
  let closestDistanceFoundToMouse = MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE;
  let closestUnit = null; // using null instead of undefined, to mean 'none found'

  for(let i = 0; i < playerUnits.length; i++) {
    let pDist = playerUnits[i].distFrom(currentMousePos.x, currentMousePos.y);
    if(pDist < closestDistanceFoundToMouse) {
      closestUnit = playerUnits[i];
      closestDistanceFoundToMouse = pDist;
    }
  }

  for(let i = 0; i < enemyUnits.length; i++) {
    let eDist = enemyUnits[i].distFrom(currentMousePos.x, currentMousePos.y);
    if(eDist < closestDistanceFoundToMouse) {
      closestUnit = enemyUnits[i];
      closestDistanceFoundToMouse = eDist;
    }
  }

  return closestUnit;
}

function mousemoveHandler(evt) {
  let mousePos = calculateMousePos(evt);
  
  if(isMouseDragging) {
    lassoX2 = mousePos.x;
    lassoY2 = mousePos.y;
  }
}

function mousedownHandler(evt) {
  let mousePos = calculateMousePos(evt);
  lassoX1 = mousePos.x;
  lassoY1 = mousePos.y;
  lassoX2 = lassoX1;
  lassoY2 = lassoY1;
  isMouseDragging = true;
}

function mouseupHandler(evt) {
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
    let clickedUnit = getUnitUnderMouse(mousePos);

    if(clickedUnit != null && clickedUnit.playerControlled == false) { // enemy? then command units to attack it
      document.getElementById("debugText").innerHTML = "Player commands " + selectedUnits.length + " units to attack!";
    } else { // didn't click enemy unit, direct any currently selected units to move
      let unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length + 2));
      for(let i = 0; i < selectedUnits.length; i++) {
        selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
      }
      document.getElementById("debugText").innerHTML = "Moving to (" + mousePos.x + ", " + mousePos.y + ")";
    }
  }
}