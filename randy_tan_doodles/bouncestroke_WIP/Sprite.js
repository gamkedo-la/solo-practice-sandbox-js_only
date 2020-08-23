const Sprite = function (image, width, height, rows, columns, frames, ctx = canvasContext) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.halfWidth = width / 2;
    this.halfHeight = height / 2;
    this.rows = rows;
    this.columns = columns;
    this.frames = frames;

    this.draw = (x, y, frame = 0, width = this.width, height = this.height, ctx = canvasContext) => {
        const c = frame % (this.columns);
        const r = Math.floor(frame / this.columns) % this.rows;

        ctx.drawImage(
            this.image,
            c * width, r,
            width, height,
            x - this.halfWidth, y - this.halfHeight,
            width, height
        );
    };
};