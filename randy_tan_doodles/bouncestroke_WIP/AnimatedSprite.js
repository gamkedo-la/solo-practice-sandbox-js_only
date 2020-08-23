const AnimatedSprite = function (sprite, ticks, ctx = canvasContext) {
    this.sprite = sprite;
    this.ticks = ticks;
    this.f = 0;
    this.t = 0;

    this.draw = (x, y, dt, ticks = this.ticks, noloop = false, frameStart = 0, frameEnd = this.sprite.frames - 1) => {
        if (this.f < frameStart) this.f = frameStart;
        sprite.draw(x, y, this.f);

        this.t += 1000 * dt;
        if (this.t > ticks) {
            this.t = 0;

            if (noloop) {
                if (this.f < frameEnd) {
                    this.f++
                }
            }
            else {
                if (this.f >= frameEnd) this.f = frameStart;
                else this.f++;
            }
        }
    };
};