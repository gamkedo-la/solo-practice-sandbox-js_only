let canvas, canvasContext;

let ballX = 75;
let ballY = 75;
let ballSpeedX = -8;
let ballSpeedY = 2;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

const PC_PADDLE_SPEEDY = 8;
let pcPaddleY = 250;

let playerPaddleY = 250;

const WIN_SCORE = 3;
let playerScore = 0;
let pcScore = 0;
let isGameOver = false;

function calculateMousePosition(e) {
	// getBoundingClientRect returns the size of an element and its position relative to the viewport
	let canvasBoundaries = canvas.getBoundingClientRect();
	let rootElement = document.documentElement;

	// Account for the margins, canvas position on page, scroll amount
	let mouseX = e.clientX - canvasBoundaries.left - rootElement.scrollLeft;
	let mouseY = e.clientY - canvasBoundaries.top - rootElement.scrollTop;

	return {
		x: mouseX,
		y: mouseY,
	};
}

function handleClick() {
	if (isGameOver) {
		isGameOver = false;
		playerScore = 0;
		pcScore = 0;
	}
}

function drawRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
	canvasContext.fillStyle = color;

	// a new separate shape, not a continuation of a previous shape
	canvasContext.beginPath();

	// Draw circle
	// 0, Math.PI * 2 = draw a full circle
	//  true = draw counterclockwise
	canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);

	// Add color to circle
	canvasContext.fill();
}

function colorText(text, x, y, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(text, x, y);
}

window.onload = () => {
	canvas = document.querySelector('#gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Call the update function around 30 times per second
	const framesPerSecond = 30;

	setInterval(updateGame, 1000 / framesPerSecond);

	canvas.addEventListener('click', handleClick);

	canvas.addEventListener('mousemove', (e) => {
		let mousePos = calculateMousePosition(e);

		// Center mouse on paddle's center
		playerPaddleY = mousePos.y - PADDLE_HEIGHT / 2;
	});

	canvasContext.textAlign = 'center';
};

function updateGame() {
	moveEverything();
	drawEverything();
}

function moveEverything() {
	if (isGameOver) {
		return;
	}

	movePcPaddle();

	if (ballX >= canvas.width) {
		if (ballY > pcPaddleY && ballY < pcPaddleY + PADDLE_HEIGHT) {
			ballSpeedX *= -1;

			// Get ball distance from paddle's center
			// If ball above the cente, increase the speed (positive value) - faster upwards
			// If ball bellow the cente, decrease the speed (negative value) - faster downwards
			let deltaY = ballY - (pcPaddleY + PADDLE_HEIGHT / 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			playerScore++;
			ballReset();
		}
	}

	if (ballX <= 0) {
		// Ball between the edges of the paddle
		if (ballY > playerPaddleY && ballY < playerPaddleY + PADDLE_HEIGHT) {
			ballSpeedX *= -1;

			let deltaY = ballY - (playerPaddleY + PADDLE_HEIGHT / 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			pcScore++;
			ballReset();
		}
	}

	if (ballY >= canvas.height || ballY <= 0) {
		ballSpeedY *= -1;
	}

	ballX += ballSpeedX;
	ballY += ballSpeedY;
}

function movePcPaddle() {
	const aiSitStillMargin = 35;

	const pcPaddleCenter = pcPaddleY + PADDLE_HEIGHT / 2;
	const abovePaddleCenter = pcPaddleCenter - aiSitStillMargin;
	const bellowPAddleCenter = pcPaddleCenter + aiSitStillMargin;

	// Check if ball is above the paddle's center
	if (ballY < abovePaddleCenter) {
		// Move paddle up
		pcPaddleY -= PC_PADDLE_SPEEDY;
	} else if (ballY > bellowPAddleCenter) {
		// Ball is bellow the paddle's center
		// Move paddle down
		pcPaddleY += PC_PADDLE_SPEEDY;
	}
}

function ballReset() {
	if (playerScore >= WIN_SCORE || pcScore >= WIN_SCORE) {
		isGameOver = true;
	}

	// Position ball in the middle of the screen
	ballX = canvas.width / 2 + 10;
	ballY = canvas.height / 2 + 10;
	ballSpeedX *= -1;
}

function drawEverything() {
	// Clear the game view - fill with black
	drawRect(0, 0, canvas.width, canvas.height, 'black');

	colorText(`Player Score: ${playerScore}`, 100, 20, 'white');
	colorText(`PC Score: ${pcScore}`, 700, 20, 'white');

	if (isGameOver) {
		gameOverScreen();
		return;
	}

	drawNet();

	drawRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	drawRect(
		canvas.width - PADDLE_WIDTH,
		pcPaddleY,
		PADDLE_WIDTH,
		PADDLE_HEIGHT,
		'white'
	);

	drawCircle(ballX, ballY, 10, 'white');
}

function gameOverScreen() {
	const winner = playerScore >= WIN_SCORE ? 'Player' : 'PC';

	colorText(
		`${winner} won the game`,
		canvas.width / 2,
		canvas.height / 2,
		'white'
	);
	colorText(
		`Click to restart game`,
		canvas.width / 2,
		canvas.height / 2 + 50,
		'white'
	);
}

function drawNet() {
	for (let position = 0; position <= canvas.height; position += 40) {
		drawRect(canvas.width / 2 - 1, position, 2, 20, 'white');
	}
}
