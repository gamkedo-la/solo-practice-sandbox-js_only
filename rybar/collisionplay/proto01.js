import { circle, pset, posX, posY } from './js/graphics.js';
import {pointCircle} from './js/collision.js';

const bgcanvas = document.getElementById('bg');
bgcanvas.width = window.innerWidth;
bgcanvas.height = window.innerHeight;
const bgctx = bgcanvas.getContext('2d');
bgctx.fillStyle = "#222";
bgctx.fillRect(0,0,bgcanvas.width, bgcanvas.height);


window.c=document.getElementById("c")
c.width = window.innerHeight * .8
c.height = window.innerHeight * .8
window.ctx = c.getContext('2d');
ctx.fillStyle="#202";
ctx.fillRect(0,0,c.width,c.height);
ctx.fillStyle="white";
circle( posX(0.5), posY(0.5), posX(0.25) );

const points = [];
for(let i = 0; i < 1000; i++){
    points.push(
        {
            x: Math.random(),
            y: Math.random()
        }
    )
}

points.forEach(function(e){
    pset( posX(e.x), posY(e.y) )
})
