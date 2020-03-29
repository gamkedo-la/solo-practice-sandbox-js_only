let Draw = new function () {
    this.rect = (x, y, w, h, bgColor, ctx = canvasContext) => {
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, w, h);
    };    
    this.colorCircle = (cx, cy, r, fillColor, ctx = canvasContext) => {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
        ctx.fill();
    };
    this.follow = (x1, y1, x2, y2, color, size = 5, ctx = canvasContext) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    };
    this.image = (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, ctx = canvasContext) => {
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };
};
