export function pointPoint(x1, y1, x2, y2){
    return (x1 == x2 && y1 == y2);
}

export function pointCircle(px, py, cx, cy, r){
    let distX = px - cx;
    let distY = py - cy;
    let distance = hypot(distX, distY);
    
    return distance <= r;
}



