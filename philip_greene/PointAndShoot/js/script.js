const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timetToNextEnemy = 0;
let enemyInterval = 500;
let lastTime = 0;

let enemies = [];

class Enemy {
    constructor(){
        this.width = 100;
        this.height = 50;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
    }
    update(){
        this.x -= this.directionX;
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const enemy = new Enemy();

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timetToNextEnemy += deltaTime;
    if (timetToNextEnemy > enemyInterval) {
        enemies.push(new Enemy());
        timetToNextEnemy = 0;
    };
    [...enemies].forEach(object => object.update());
    [...enemies].forEach(object => object.draw());
    requestAnimationFrame(animate);
}
animate(0);