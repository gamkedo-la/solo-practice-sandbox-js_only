var canvas, canvasContext;

const PLAYER_START_UNITS = 20;
var playerUnits = [];
const ENEMY_START_UNITS = 15;
var enemyUnits = [];


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');      
  
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();    
        drawEverything();
    }, 1000/framesPerSecond);

    //canvas.addEventListener('click', function(evt) {
    //    var mousePos = calcMousePos(evt);
        
    //    for (var i = 0; i < playerUnits.length; i++) {
    //        playerUnits[i].gotoNear(mousePos.x, mousePos.y);
    //    }
    //});
    
    canvas.addEventListener('mousemove', mousemoveHandler);
    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('mouseup', mouseupHandler);

    for (var i = 0; i < PLAYER_START_UNITS; i++) {
        var spawnUnit = new unitClass();
        spawnUnit.resetAndSetPlayerTeam(true);
        playerUnits.push(spawnUnit);
    }

    for (var i = 0; i < ENEMY_START_UNITS; i++) {
        var spawnUnit = new unitClass();
        spawnUnit.resetAndSetPlayerTeam(false);
        playerUnits.push(spawnUnit);
    }
}

function moveEverything() {    
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].move();
    }

    for (var i = 0; i < enemyUnits.length; i++) {
        enemyUnits[i].move();
    }
}

function drawEverything() {
    // <-- background --> //
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // <-- Unit --> //
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].draw();
    }

    for (var i = 0; i < enemyUnits.length; i++) {
        enemyUnits[i].draw();
    }

    // <-- lasso for selecting unit --> //
    for (var i = 0; i < playerUnits.length; i++) {
        selectedUnits[i].drawSelectionBox();
    }
    
    if (isMouseDragging) {
        coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow');
    }
}