const Draw = {
    rect: (x, y, w, h, bgColor, ctx = Game.canvasContext) => {
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, w, h);
    },
    outlineRect: (x, y, w, h, lineColor, lineWidth, ctx = Game.canvasContext) => {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.rect(x, y, w, h);
        ctx.stroke();
    },
    colorCircle: (cx, cy, r, fillColor, ctx = Game.canvasContext) => {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
        ctx.fill();
    },
    follow: (x1, y1, x2, y2, color, size = 5, ctx = Game.canvasContext) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    },
    image: (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, ctx = Game.canvasContext) => {
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    },
};