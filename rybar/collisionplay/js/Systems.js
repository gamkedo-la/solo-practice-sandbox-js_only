import { polyCircle, pset, clearScreen } from './graphics.js';
const systems = {};

systems.render = function systemRender ( entities ){
    clearScreen();
    
    for(var entityId in entities){
        let e = entities[entityId];
        console.log('render loop')
        //only run logic if entity has relevant components
        if( e.components.appearance && e.components.position ) {
            console.log('valid components rendering')
            
            //draw a circle if exists a radius component
            if(e.components.radius){
                console.log('valid components for circle draw')
                ctx.fillStyle = e.components.appearance.fill;
                
                polyCircle(e.components.position.x, e.components.position.y, e.components.radius.value, 10)
                console.log(e.components.position.x, e.components.position.y, e.components.radius.value, e.components.appearance.fill)
            }
            else {
                pset(e.x, e.y);
            }
        }

    }
}

export default systems;