const INITIAL_LIVES = 3;
var canvas;
var canvasContext;
var framesPerSecond = 30;
var score = 0;
var lives = INITIAL_LIVES;
var outaLivesEvent = new CustomEvent('outaLives');
var ballHeld = true;
var showTitle = true;
var lastScore = score;


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	loadImages();
	canvas.addEventListener('allImagesLoaded', function() {
		canvas.removeEventListener('allImagesLoaded', this);
		resetBricks();
		setInterval(function() {
			moveEverything();
			drawEverything();
		}, 1000/framesPerSecond);
		canvas.addEventListener('mousemove', movePaddleOnMouseMove);
		canvas.addEventListener('ballMiss', dropLife);
		canvas.addEventListener('brickHit', removeBrickOnHit);
		canvas.addEventListener('brickHit', increaseScore);
		canvas.addEventListener('brickHit', increaseSpeed);
		canvas.addEventListener('outaLives', resetGame);
		canvas.addEventListener('mousedown', function(evt) {
			if (showTitle) {
				showTitle = false;
			}
			ballHeld = false;
		});
		ballReset();
	});
}

function resetGame() {
	lastScore = score;
	baseSpeed = INITIAL_SPEED;
	maxSpeed = INITIAL_MAX_SPEED;
	resetBricks();
	resetScore();
	ballHeld = true;
	ballReset();
	lives = INITIAL_LIVES;
	showTitle = true;
}

function dropLife() {
	lives--;
	if (lives < 0) {
		canvas.dispatchEvent(outaLivesEvent);
	}
}

function resetScore() {
	score = 0;
}

function increaseScore() {
	score += 100;
}

function drawTitleScreen() {
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	drawBitMap(titlePic, 0, 0);
	if (lastScore > 0) {
		canvasContext.fillStyle = 'white';
		canvasContext.textAlign = 'center';
		canvasContext.fillText("LAST SCORE " + lastScore.toString(), canvas.width/2, 120);
	}
}

function drawEverything() {
	if (showTitle) {
		drawTitleScreen();
	} else {
		colorRect(0, 0, canvas.width, canvas.height, 'rgb(75,105,47 )');
		canvasContext.fillStyle = 'white';
		canvasContext.textAlign = 'center';
		canvasContext.fillText(score.toString(), canvas.width/2, 10);
		drawPaddle();
		drawBall();
		drawBricks();
		drawLives();
	}
}

function moveEverything() {
	if (showTitle) {
	} else {
		ballMove();
	}
}

function drawLives() {
	var posX = canvas.width - 30;
	var posY = 10;
	for (var i=0; i<lives; i++) {
		drawBitMap(livesPic, posX - i*20, posY);
	}
}
