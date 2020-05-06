var canvas;
var canvasContext;
var gameState = "combat";

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	console.log("Load");
    loadImages();
	console.log("Init");
    initInput();

    canvas.addEventListener('mousemove', function(evt) {

        var mousePos = calculateMousePos(evt);

        MousePosX = mousePos.x;
        MousePosY = mousePos.y;
        canvasContext = canvas.getContext('2d');
    });

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}

function imageLoadingDoneSoStartGame() {
    console.log("start");
	var framesPerSecond = 60;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
}

function moveEverything() {

}
	
function drawEverything() {
	if(gameState == "combat"){
		drawCombatScreen();
	}
}



function resetGame() {
	
}