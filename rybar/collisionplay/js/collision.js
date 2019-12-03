export function pointPoint(x1, y1, x2, y2){
    return (x1 == x2 && y1 == y2);
}

export function pointCircle(px, py, cx, cy, r){
    let distX = px - cx;
    let distY = py - cy;
    let distance = Math.hypot(distX, distY);
    
    return distance <= r;
}

export function circleCircle(c1x, c1y, c1r, c2x, c2y, c2r){
    let distX = c1x - c2x;
    let distY = c1y - c2y;
    let distance = Math.hypot(distX, distY);

    return distance <= c1r+c2r;
}



