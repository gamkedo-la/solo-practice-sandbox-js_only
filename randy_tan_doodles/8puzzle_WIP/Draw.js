let Draw = new function () {
    this.text = function (text, x, y, fontSize, fontStyle, fontColor) {
        ctx.font = fontSize + 'px ' + fontStyle;
        ctx.fillStyle = fontColor;
        ctx.fillText(text, x, y);
    };

    this.rect = function (x, y, width, height, bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, width, height);
    };

    this.outlineRect = function (x, y, width, height, lineColor, lineWidth) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.rect(x, y, width, height);
        ctx.stroke();
    };

    this.colorCircle = function (centerX, centerY, radius, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.fill();
    };

    this.outlineCircle = function (centerX, centerY, radius, strokeColor, lineWidth = 1) {
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.setLineDash([]);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };
};
