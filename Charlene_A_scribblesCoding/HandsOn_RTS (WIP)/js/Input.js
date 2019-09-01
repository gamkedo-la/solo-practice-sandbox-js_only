var canvas, canvasContext;

const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;
const MIN_DIST_TO_COUNT_DRAG = 10;
var selectedUnits = [];

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;

function mousemoveHandler(evt) {
    var mousePos = calcMousePos(evt);

    if (isMouseDragging) {
        lassoX2 = mousePos.x;
        lassoY2 = mousePos.y;
    }
}

function mousedownHandler(evt) {
    var mousePos = calcMousePos(evt);
    lassoX1 = mousePos.x;
    lassoY1 = mousePos.y;
    lassoX2 = lassoX1;
    lassoY2 = lassoY1;
    isMouseDragging = true;
}

function mouseupHandler(evt) {
    isMouseDragging = false;

    if (mouseMovedEnoughToTreatAsDrag()) {
        selectedUnits = [];
        
        for (var i = 0; i < playerUnits.length; i++) {
            if (playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
                selectedUnits.push(playerUnits[i]);
            }
        }
        
        document.getElementById("debugText").innerHTML = "Selected " + selectedUnits.length + " units";
    } else {
        var mousePos = calcMousePos(evt);
        var clickedUnit = getUnitUnderMouse(mousePos);
        
        if (clickedUnit != null && clickedUnit.playerControlled == false) {
            document.getElementById("debugText").innerHTML = "Player commands " + selectedUnits.length + " units to attack!";
        } else {
            var unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length * 2));
            
            for (var i = 0; i < selectedUnits.length; i++) {
                selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
            }

            document.getElementById("debugText").innerHTML = "Moving to (" + mousePos.x + ", " + mousePos.y + ")";
        }
    }
}

function calcMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;
  
    // account for the margins, canvas position on page, scroll amount, etc
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
    var dragDist = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    return (dragDist > MIN_DIST_TO_COUNT_DRAG);
}

function getUnitUnderMouse(currentMousePOS) {
    var closestDistanceFoundToMouse = MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE;
    var closestUnit = null;

    for (var i = 0; i < playerUnits.length; i++) {
        var pDist = playerUnits[i].distFrom(currentMousePOS.x, currentMousePOS.y);
        if (pDist < closestDistanceFoundToMouse) {
            closestUnit = playerUnits[i];
            closestDistanceFoundToMouse = pDist;
        }
    }

    for (var i = 0; i < enemyUnits.length; i++) {
        var pDist = enemyUnits[i].distFrom(currentMousePOS.x, currentMousePOS.y);
        if (pDist < closestDistanceFoundToMouse) {
            closestUnit = enemyUnits[i];
            closestDistanceFoundToMouse = pDist;
        }
    }

    return closestUnit;
}