var canvas;
var canvasContext;
var gameState = "chooseTeam";

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
    loadImages();

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
	var framesPerSecond = 60;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
}


function moveEverything() {

}
	
function drawEverything() {
	if(gameState == "chooseTeam"){
		drawChooseTeamScreen();
	} else if(gameState == "combat"){
		drawCombatScreen();
	}
}



function resetGame() {
	
}