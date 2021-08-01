var btnMoveVoid = document.getElementById('moveVoid');
var tileSize20 = document.getElementById('tile20');
var tileSize40 = document.getElementById('tile40');

btnMoveVoid.addEventListener('click', resetWorld);

function resetWorld() {
    resetGrid();
    ballList = [];
    createEveryBall();
    drawEverything();
}

