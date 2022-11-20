let ballX = 170;
let ballY = 170;
let ballSpeedX = 5;
let ballSpeedY = 5;
let ballSize = 10;

const BRICK_W = 100;
const BRICK_H = 20;
const BRICK_GAP = 4;
const BRICK_COLS = 8;
const BRICK_ROWS = 18;
// const brickGrid = [true, true, true, true];
const brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

const PADDLE_WIDTH = 150;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 30;
let paddleX = 400;
let mouseX = 0;
let mouseY = 0;

function brickReset() {
	let i;
	for (i = 0; i < 8 * BRICK_COLS; i++) {
		brickGrid[i] = false;
	}
	for (; i < BRICK_COLS * BRICK_ROWS; i++) {
		brickGrid[i] = Math.random() < 0.5;
		// brickGrid[i] = true;
	}
}

window.onload = () => {
	const fps = 60;
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
	const peeeeeep = document.querySelector('#peeeeeep');
	const plop = document.querySelector('#plop');
	const beeep = document.querySelector('#beeep');
	const tune1 = document.querySelector('#tune1');
	const tune2 = document.querySelector('#tune2');
	let activeTune = Math.random() < 0.5 ? tune1 : tune2;
	canvas.width = 800;
	canvas.height = 700;

	activeTune.volume = 0.2;
	canvas.addEventListener('click', () => {
		activeTune.play();
	});
	document.addEventListener('keydown', e => {
		if (e.code === 'Space') {
			activeTune.pause();
		}
	});

	activeTune.addEventListener('ended', () => {
		// tune2.currentTime = 0.1;
		activeTune.play();
	});
	// peeeeeep.load();
	// plop.load();
	// beeep.load();

	function updateMousePos(evt) {
		let rect = document.querySelector('body').getBoundingClientRect();
		let root = document.documentElement;
		mouseX = evt.clientX - rect.left - root.scrollLeft;
		mouseY = evt.clientY - rect.top - root.scrollTop;

		paddleX = mouseX - PADDLE_WIDTH * 0.5;
		// paddleY = mouseY;

		// cheat
		// ballX = mouseX;
		// ballY = mouseY;
		// ballSpeedX = 4;
		// ballSpeedY = -4;
	}

	let counter = 1;
	let direction = 'left';
	function updateAll() {
		if (Math.ceil(counter) <= 25 && direction === 'right') {
			counter += 0.2;
			if (Math.ceil(counter) >= 25) {
				direction = 'left';
			}
		} else if (Math.floor(counter) >= -25 && direction === 'left') {
			counter -= 0.2;
			if (Math.floor(counter) <= -25) {
				direction = 'right';
			}
		}
		// canvas.style.transform = `perspective(360px) rotateX(25deg) scale3d(1, 1.5, 1) rotateY(${counter}deg)`;
		moveAll();
		drawAll();
	}
	setInterval(updateAll, 1000 / fps);

	document.addEventListener('mousemove', updateMousePos);

	brickReset();
	ballReset();

	function colRowToArrayIndex(col, row) {
		return col + BRICK_COLS * row;
	}

	function drawBricks() {
		for (let eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
			for (let eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
				const arrayIndex = colRowToArrayIndex(eachCol, eachRow);
				if (brickGrid[arrayIndex]) {
					colorRect(
						BRICK_W * eachCol,
						BRICK_H * eachRow,
						BRICK_W - BRICK_GAP,
						BRICK_H - BRICK_GAP,
						'blue'
					);
				}
			}
		}
	}

	function drawAll() {
		// clear screen on every render
		colorRect(0, 0, canvas.width, canvas.height, 'black');

		// ball
		colorCircle(ballX, ballY, ballSize, 'white');

		// paddle
		colorRect(
			paddleX,
			canvas.height - PADDLE_DIST_FROM_EDGE,
			PADDLE_WIDTH,
			PADDLE_THICKNESS,
			'white'
		);

		drawBricks();
	}

	function ballReset() {
		ballX = canvas.width * 0.5;
		ballY = canvas.height * 0.5;
	}

	function ballMove() {
		ballX += ballSpeedX;
		ballY += ballSpeedY;
		if (ballX - ballSize <= 0 && ballSpeedX < 0.0) {
			ballSpeedX *= -1;
		}
		if (ballX + ballSize >= canvas.width && ballSpeedX > 0.0) {
			ballSpeedX *= -1;
		}
		if (ballY - ballSize <= 0 && ballSpeedY < 0.0) {
			ballSpeedY *= -1;
		}
		if (ballY > canvas.height) {
			ballReset();
		}
	}

	function isBrickAtColRow(col, row) {
		if (col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS) {
			const brickIndexUnderCoord = colRowToArrayIndex(col, row);
			return brickGrid[brickIndexUnderCoord];
		} else {
			return false;
		}
	}

	function ballBrickHandling() {
		let xResult;
		let yResult;
		if (ballSpeedX > 0) {
			xResult = ballX + ballSize;
		} else if (ballSpeedX < 0) {
			xResult = ballX - ballSize;
		}
		if (ballSpeedY > 0) {
			yResult = ballY + ballSize;
		} else if (ballSpeedY < 0) {
			yResult = ballY - ballSize;
		}
		const ballBrickCol = Math.floor(xResult / BRICK_W);
		const ballBrickRow = Math.floor(yResult / BRICK_H);
		const brickIndexUnderBall = colRowToArrayIndex(ballBrickCol, ballBrickRow);

		// debug coordinates
		// colorText(
		// 	`${ballBrickCol}, ${ballBrickRow}: ${brickIndexUnderBall}`,
		// 	mouseX - 20,
		// 	mouseY - 10,
		// 	'yellow'
		// );

		if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
			brickGrid[brickIndexUnderBall] = false;

			const prevBallX = ballX - ballSpeedX;
			const prevBallY = ballY - ballSpeedY;
			const prevBrickCol = Math.floor(prevBallX / BRICK_W);
			const prevBrickRow = Math.floor(prevBallY / BRICK_H);

			let bothTestsFailed = true;
			plop.play();
			if (prevBrickCol !== ballBrickCol) {
				if (isBrickAtColRow(prevBrickCol, ballBrickRow) === false) {
					ballSpeedX *= -1;
					bothTestsFailed = false;
				}
			}
			if (prevBrickRow !== ballBrickRow) {
				if (isBrickAtColRow(ballBrickCol, prevBrickRow) === false) {
					ballSpeedY *= -1;
					bothTestsFailed = false;
				}
			}

			if (bothTestsFailed) {
				ballSpeedX *= -1;
				ballSpeedY *= -1;
			}
		}
	}

	function ballPaddleHandling() {
		const paddleTopEdgeY =
			canvas.height - PADDLE_DIST_FROM_EDGE - PADDLE_THICKNESS;
		const paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
		const paddleLeftEdgeX = paddleX;
		const paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

		if (
			ballY > paddleTopEdgeY &&
			ballY < paddleBottomEdgeY &&
			ballX > paddleLeftEdgeX &&
			ballX < paddleRightEdgeX
		) {
			plop.play();
			ballSpeedY *= -1;

			let centerOfPaddleX = paddleX + PADDLE_WIDTH * 0.5;
			let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
			ballSpeedX = ballDistFromPaddleCenterX * 0.35;

			if (brickGrid.filter(i => !!i).length === 0) {
				brickReset();
			}
		}
	}

	function moveAll() {
		ballMove();
		ballBrickHandling();
		ballPaddleHandling();
	}

	function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
		ctx.fillStyle = fillColor;
		ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
	}

	function colorCircle(centerX, centerY, radius, fillColor) {
		ctx.fillStyle = fillColor;
		ctx.beginPath();
		ctx.arc(centerX, centerY, ballSize, radius, 0, Math.PI * 2, true);
		ctx.fill();
	}

	function colorText(showWords, textX, textY, fillColor) {
		ctx.fillStyle = fillColor;
		ctx.fillText(showWords, textX, textY);
	}

	// function animate() {
	// 	requestAnimationFrame(animate);
	// 	moveAll();
	// 	drawAll();
	// }
	// animate();
};
