
import Entity from './js/Entity.js';
import Components from './js/Components.js';
import systems from './js/Systems.js';

import { clearScreen, polyCircle } from './js/graphics.js';
//import col from './js/collision.js';

import Stats from './js/stats.module.js';

const stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

window.c=document.getElementById("c")
c.width = window.innerHeight * .8
c.height = window.innerHeight * .8
console.log(c.width, c.height);
window.ctx = c.getContext('2d');


window.entities = [];
for(let i = 0; i < 1; i++){

    let ball = new Entity();

    // let pos = new Components.Position({x: Math.random(), y: Math.random() })
    // let fill = new Components.Appearance({value:'green'})
    // let radius = new Components.Radius({value: Math.random()*0.2})

    let pos = new Components.Position({x: 0.5, y: 0.5 })
    let fill = new Components.Appearance('red')
    let radius = new Components.Radius(0.5)

    ball.addComponents([pos, fill, radius]);
    entities.push(ball);
    ball.print();

    

}


function render(){

    systems.render( entities );

}

function update(){
    
}

function frame(){
    stats.begin();
    update();
    render();
    stats.end();
    //requestAnimationFrame(frame);
}

requestAnimationFrame(frame);


