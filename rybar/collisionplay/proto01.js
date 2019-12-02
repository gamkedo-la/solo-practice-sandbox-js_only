import { circle, pset, posX, posY, polyCircle } from './js/graphics.js';
import { pointCircle } from './js/collision.js';
import Stats from './js/stats.module.js';

const stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const bgcanvas = document.getElementById('bg');
bgcanvas.width = window.innerWidth;
bgcanvas.height = window.innerHeight;
const bgctx = bgcanvas.getContext('2d');
bgctx.fillStyle = "#222";
bgctx.fillRect(0,0,bgcanvas.width, bgcanvas.height);


window.c=document.getElementById("c")
c.width = window.innerHeight * .8
c.height = window.innerHeight * .8
console.log(c.width, c.height);
window.ctx = c.getContext('2d');

const whiteBall = {x: 0.5, y:0.5, r: 0.25, fill: 'white'}
const pointsA = [];
for(let i = 0; i < 2000; i++){
    let x = Math.random();
    let y = Math.random();
    let collides = pointCircle( x, y, whiteBall.x, whiteBall.y, whiteBall.r )
    if(!collides) pointsA.push( { x: x, y: y, fill: Math.random()>0.5?'chartreuse':'yellow' } )
}
function render(){
    ctx.save();

    ctx.fillStyle="#202";
    ctx.fillRect(0,0,c.width,c.height);

    // ctx.fillStyle='white';
    // for(let i = 0; i < 400; i++){
    //     let j = i/400 * 6.283185;
    //     let x = whiteBall.x + Math.cos(j)*whiteBall.r;
    //     let y = whiteBall.y + Math.sin(j)*whiteBall.r;
    //     ctx.fillRect(posX(x), posY(y), 2, 2)
    // }

    // ctx.fillStyle=whiteBall.fill;
    // circle( posX(whiteBall.x), posY(whiteBall.y), posX(whiteBall.r) );

    // ctx.fillStyle='#fff'
    // circle( 376, 376, 188 );
    
    // ctx.arc(376,376,188,0,6.283185306);
    // ctx.fill();
    ctx.fillStyle = 'white';
    polyCircle(whiteBall.x, whiteBall.y, whiteBall.r, 20);
    
    pointsA.forEach(function(e){
        ctx.fillStyle = e.fill;
        pset( posX(e.x), posY(e.y) )
    })
    ctx.restore();

}

function update(){
    pointsA.forEach(function(e){
        e.fill=='chartreuse'?e.x += 0.005 : e.y+=0.005;
        if(e.x > 1) e.x -= 1;
        if(e.y > 1) e.y -= 1;
    })
}

function frame(){
    stats.begin();
    update();
    render();
    stats.end();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
//frame();


