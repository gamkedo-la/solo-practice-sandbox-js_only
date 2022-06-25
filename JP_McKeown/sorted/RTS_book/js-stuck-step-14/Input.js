// my June 2022 effort to follow RTS steps from CdL book
var isMouseDragging = false;
const MIN_DIST_TO_COUNT_DRAG = UNIT_PLACEHOLDER_RADIUS *2;
const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;
var selectedUnits = []; 

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}
function mouseMovedEnoughToTreatAsDrag() {
  var deltaX = lassoX1 - lassoX2;
  var deltaY = lassoY1 - lassoY2;
  var dragDist = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  return (dragDist > MIN_DIST_TO_COUNT_DRAG);
}

function getUnitUnderMouse(currentMousePos) {
  var closestDistanceFoundToMouse = MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE;
  var closestUnit = null;  // none found yet

  for(var i = 0; i<playerUnits.length; i++) {
    var pDist = playerUnits[i].distFrom(currentMousePos.x, currentMousePos.y);
    if(pDist < closestDistanceFoundToMouse) {
      closestUnit = playerUnits[i];
      closestDistanceFoundToMouse = pDist;
    }
  }
  for(var i = 0; i<enemyUnits.length; i++) {
    var eDist = enemyUnits[i].distFrom(currentMousePos.x, currentMousePos.y);
    if(eDist < closestDistanceFoundToMouse) {
      closestUnit = enemyUnits[i];
      closestDistanceFoundToMouse = eDist;
    }
  }
  return closestUnit;
}

function mousemoveHandler (evt) {
  var mousePos = calculateMousePos(evt);
  //// removed debug line from here
  if(isMouseDragging) {
    lassoX2 = mousePos.x;
    lassoY2 = mousePos.y;
  }
}