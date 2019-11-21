export function circle(x, y, r){
    //assumes global ctx
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
}

export function pset(x,y){
    ctx.fillRect(Math.floor(x),Math.floor(y),1,1);
}

