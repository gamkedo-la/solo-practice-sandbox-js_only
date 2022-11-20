const fps = 60;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// canvas.width = innerWidth;
// canvas.height = innerHeight;
canvas.width = 800;
canvas.height = 800;
ctx.fillStyle = 'black';

class Paddle {
	constructor() {
		this.distance_from_edge = 30;
		this.height = 10;
		this.width = 200;
		this.x = canvas.width * 0.5 - this.width * 0.5;
		this.y = canvas.height - this.distance_from_edge;
		this.color = 'white';
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	update(mouseX, mouseY) {
		this.x = mouseX - this.width * 0.5;
	}
}

const paddle = new Paddle();

canvas.addEventListener('mousemove', e => {
	const rect = canvas.getBoundingClientRect();
	const root = document.documentElement;
	const mouseX = e.clientX - rect.left - root.scrollLeft;
	const mouseY = e.clientY - rect.top - root.scrollTop;
	paddle.update(mouseX, mouseY);
});

function animate() {
	// clear screen
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	paddle.draw();
	// paddle.update();
	requestAnimationFrame(animate);
}
animate();
