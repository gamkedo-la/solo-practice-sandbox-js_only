import { circle } from './js/graphics.js';

const bgcanvas = document.getElementById('bg');
bgcanvas.width = window.innerWidth;
bgcanvas.height = window.innerHeight;
const bgctx = bgcanvas.getContext('2d');
bgctx.fillStyle = "#222";
bgctx.fillRect(0,0,bgcanvas.width, bgcanvas.height);
bgctx.globalAlpha = 0.2;
bgctx.fillStyle = "#000";
for(let i = 0; i < 100; i++){
    bgctx.beginPath();
    bgctx.arc(Math.random()*bgcanvas.width, Math.random()*bgcanvas.height, Math.random()*100, 0, Math.PI*2)
    bgctx.closePath();
    bgctx.fill();
}


window.c=document.getElementById("c")
c.width = window.innerHeight * .8
c.height = window.innerHeight * .8
window.ctx = c.getContext('2d');
ctx.fillStyle="green";
ctx.fillRect(0,0,c.width,c.height);
ctx.fillStyle="white";
circle(128,128,52);
