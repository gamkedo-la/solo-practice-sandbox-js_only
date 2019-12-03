import {pset, posX, posY, polyCircle } from './js/graphics.js';
import { pointCircle } from './js/collision.js';
import Stats from './js/stats.module.js';

const stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

window.c=document.getElementById("c")
c.width = window.innerHeight * .8
c.height = window.innerHeight * .8
console.log(c.width, c.height);
window.ctx = c.getContext('2d');

const balls = [];
for(let i = 0; i < 10; i++){
    balls.push({
        x: Math.random(),
        y: Math.random(),
        xVel: 0,
        yVel: 0,
        xMaxVel: 0.2,
        yMaxVel: 0.2,
        xAcc: 0,
        yAcc: .01,
        r: Math.random() * .2
    })
}


function render(){

    ctx.fillStyle="rgba(30,0,30,0.2)";
    ctx.fillRect(0,0,c.width,c.height);

    balls.forEach(function(e){
        ctx.fillStyle = 'white'
        polyCircle(e.x, e.y, e.r, 50)
    })

}

function update(){
    balls.forEach(function(e){
        
    })
    for(let i = 0; i < balls.length; i++){

    }
}

function frame(){
    stats.begin();
    update();
    render();
    stats.end();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);


