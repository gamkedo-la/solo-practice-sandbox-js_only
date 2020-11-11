var canvas, canvasContext, framesPerSecond, frameRate, camera;

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	console.log(window.innerWidth);
	
	loadImages();
	initializeGame();
}

function initializeGame()
{
	framesPerSecond = 30;
	frameRate = 1000/framesPerSecond;

	background = new Background();
	background.initialize();

	trackGrid = new TrackGrid();
	trackGrid.initialize();

	scooter = new Scooter();
	scooter.initialize();

	pickupAndDeliveryManager = new PickupAndDeliveryManager();

	snatchApp = new SnatchApp();
	snatchApp.startOrderCycle();

	canvas.addEventListener('mousemove', updateMousePosition);
	document.addEventListener('keydown', handleKeyPress);
	document.addEventListener('keyup', handleKeyRelease);

	camera = new Camera();

	setInterval(gameLoop, frameRate);
}

function updateEverything()
{
	scooter.update();
	camera.follow(canvas, scooter);
	pickupAndDeliveryManager.checkForWaypointArrivals();
}

function drawEverything()
{
	background.draw();
	// camera.startPan(canvasContext);
	canvasContext.save();
	
	canvasContext.translate(-scooter.centerX + canvas.width/2,-scooter.centerY + canvas.height/2);
	trackGrid.draw();
	pickupAndDeliveryManager.drawWaypoints();
	canvasContext.restore();
	// camera.endPan(canvasContext);
	
	snatchApp.drawMessage();
	scooter.draw();

	if (debugOn)
	{
		drawDebugStuff();
	}
}

function gameLoop()
{
	updateEverything();
	drawEverything();
}