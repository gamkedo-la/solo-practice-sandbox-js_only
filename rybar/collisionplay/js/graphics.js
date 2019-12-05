export function clearScreen(color='#aa00aa'){
    ctx.fillStyle = color;
    ctx.fillRect(0,0,c.width,c.height)
}

export function polyCircle(x,y,r,sides=10){
    ctx.beginPath();
    for(let i = 0; i < sides; i++){
        let j = i/sides * 6.283185;
        let px = x + Math.cos(j)*r;
        let py = y + Math.sin(j)*r;
        //ctx.moveTo(px, py);
        ctx.lineTo(posX(px),posY(py));
    }
    ctx.closePath();
    ctx.fill();
}

export function pset(x,y){
    //assumes global ctx
    ctx.fillRect(x,y,2,2);
}

export function posX(normalized){
    //takes number in "height units" where 1 = screenheight. 
    //assumes global canvas object c
    return c.width * normalized;
}

export function posY(normalized){
    //assumes global canvas object c
    return c.height * normalized;
}



export const colors = [
    
]