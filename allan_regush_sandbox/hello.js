canvas = document.getElementById('canvas');


function Ball() {
    this.posX = 0;
    this.posY = 0;
}

let ball = new Ball();

for(let i = 0; 0 < 10; ++i) {
    ball.posX = i;
    ball.posY = i;
}

console.log(ball);

