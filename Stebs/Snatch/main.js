var canvas, canvasContext, framesPerSecond, frameRate, camera;

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	console.log(window.innerWidth);
	scooterImage.onload = function()
	{
		scooterImageLoaded = true;
	}
	scooterImage.src = 'scooter-auto-spritesheet-16.png';

	roadImage.onload = function()
	{
		roadImageLoaded = true;
	}
	roadImage.src = 'road.png';

	roadWithHorizontalDashImage.onload = function()
	{
		roadWithHorizontalDashImageLoaded = true;
	}
	roadWithHorizontalDashImage.src = 'road_with_horizontal_dash.png';

	roadWithHorizontalDashImage.onload = function()
	{
		sidewalkImageLoaded = true;
	}
	sidewalkImage.src = 'sidewalk.png';

	roadWithVerticalDashImage.onload = function()
	{
		roadWithVerticalDashImageLoaded = true;
	}
	roadWithVerticalDashImage.src = 'road_with_vertical_dash.png';

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
	
}

function drawEverything()
{
	background.draw();
	// camera.startPan(canvasContext);
	canvasContext.save();
	canvasContext.translate(-scooter.centerX,-scooter.centerY);
	trackGrid.draw();
	canvasContext.restore();
	// camera.endPan(canvasContext);
	
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