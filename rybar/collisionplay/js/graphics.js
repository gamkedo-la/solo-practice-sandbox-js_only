export function circle(x, y, r){
    //assumes global ctx
    ctx.arc(x,y,r,0,6.283185306);
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