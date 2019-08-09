var canvas, canvasContext;

const PLAYER_START_UNITS = 8;
var playerUnits = [];
var selectedUnits = [];

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;

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

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');      
  
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();    
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calcMousePos(evt);
        
        if (isMouseDragging)
        {
            lassoX2 = mousePos.x;
            lassoY2 = mousePos.y;
        }
    });

    //canvas.addEventListener('click', function(evt) {
    //    var mousePos = calcMousePos(evt);
        
    //    for (var i = 0; i < playerUnits.length; i++) {
    //        playerUnits[i].gotoNear(mousePos.x, mousePos.y);
    //    }
    //});


    canvas.addEventListener('mousedown', function(evt) {
        var mousePos = calcMousePos(evt);
        lassoX1 = mousePos.x;
        lassoY1 = mousePos.y;
        lassoX2 = lassoX1;
        lassoY2 = lassoY1;
        isMouseDragging = true;
    });

    canvas.addEventListener('mouseup', function(evt) {
        isMouseDragging = false;

        selectedUnits = [];

        for (var i = 0; i < playerUnits.length; i++) {
            if (playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
                selectedUnits.push(playerUnits[i]);
            }
        }

        document.getElementById("debugText").innerHTML = "Selected " + selectedUnits.length + " units";
    });

    for (var i = 0; i < PLAYER_START_UNITS; i++) {
        var spawnUnit = new unitClass();
        spawnUnit.reset();
        playerUnits.push(spawnUnit);
    }
}

function moveEverything() {    
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].move();
    }
}

function drawEverything() {
    // <-- background --> //
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // <-- Unit --> //
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].draw();
    }

    // <-- lasso for selecting unit --> //
    for (var i = 0; i < playerUnits.length; i++) {
        selectedUnits[i].drawSelectionBox();
    }
    
    if (isMouseDragging) {
        coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow');
    }
}