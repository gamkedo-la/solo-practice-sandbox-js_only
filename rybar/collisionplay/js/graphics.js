export function circle(x, y, r){
    //assumes global ctx
    ctx.arc(x,y,r,0,6.283185306);
    ctx.fill();
}

export function polyCircle(x,y,r,sides){
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
    //takes number between 0 and 1, returns value between 0 and canvas width
    //assumes global canvas object c
    return c.width * normalized;
}

export function posY(normalized){
    //assumes global canvas object c
    return c.height * normalized;
}

export const colors = [
    
]