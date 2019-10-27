let Draw = new function () {    
    this.colorCircle = (cx, cy, r, fillColor) => {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
        ctx.fill();
    };

    this.follow = (x1, y1, x2, y2, color, size = 5) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
};
