// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

const MIN_DISTANCE_TO_TREAT_AS_DRAG = UNIT_RADIUS *2;
const MIN_DISTANCE_FOR_CLICK_SELECTABLE = 12;

let lassoX1 = 0;
let lassoY1 = 0;
let lassoX2 = 0;
let lassoY2 = 0;
let isMouseDragging = false;

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
    var dragDistance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    return (dragDistance > MIN_DISTANCE_TO_TREAT_AS_DRAG);
}

function getUnitUnderMouse(mousePos) {
    return findClosestUnitInRange(mousePos.x, mousePos.y, MIN_DISTANCE_FOR_CLICK_SELECTABLE, allUnits);
}

function mousemoveHandler(evt) {
    var mousePos = calculateMousePos(evt);
    // showText(mousePos.x + "," + mousePos.y);
    if(isMouseDragging) {
        lassoX2 = mousePos.x;
        lassoY2 = mousePos.y;
    }
}

function mousedownHandler(evt) {
    var mousePos = calculateMousePos(evt);
    lassoX1 = mousePos.x;
    lassoY1 = mousePos.y;
    lassoX2 = lassoX1;
    lassoY2 = lassoY1;
    isMouseDragging = true;
} 

function mouseupHandler(evt) {
    isMouseDragging = false;

    if(mouseMovedEnoughToTreatAsDrag()) {
        selectedUnits = []; // clear selection
        for(var i=0; i<playerUnits.length; i++) {
            if(playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
                selectedUnits.push(playerUnits[i]);
            }
        }
        showText('Selected ' + selectedUnits.length + ' units.');
    } else {
        // mouse didnt move far since mousedown, treat as click either for move or attack command 
        var mousePos = calculateMousePos(evt);
        var clickedUnit = getUnitUnderMouse(mousePos);

        if(clickedUnit != null && clickedUnit.playerControlled == false) {
            // is enemy unit, command attack it
            for(var i=0; i<selectedUnits.length; i++) {
                selectedUnits[i].setTarget(clickedUnit);
            }
            showText('Player commands ' + selectedUnits.length + ' units to attack!');

        } else {
            // no enemy there, treat as click commanding move
            var formationSize = Math.floor(Math.sqrt(selectedUnits.length + FORMATION_FUDGE));

            for(var i=0; i<selectedUnits.length; i++) {
                selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, formationSize);         
            }
            showText('Moving to ' + mousePos.x + ',' + mousePos.y);
        }
    }
}