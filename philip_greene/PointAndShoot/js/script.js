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
        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'img/like-indicator-Sheet.png';
    }
    update(){
        this.x -= this.directionX;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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
    enemies = enemies.filter(object => !object.markedForDeletion);
    requestAnimationFrame(animate);
}
animate(0);