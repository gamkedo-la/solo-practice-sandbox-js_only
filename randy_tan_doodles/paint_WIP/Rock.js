let Rock = function(cvs = canvas) {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.img = document.createElement("img");
    this.img.src = "rock.png";
    this.imgLoaded = false;

    this.img.onload = () => {
        this.imgLoaded = true;
        this.x = cvs.width * 0.5 - this.img.width * 0.25;
    };

    this.update = (dt, stroke) => {
        if (this.imgLoaded) {
            this.vy += 8;
            this.y += this.vy * dt;

            if (stroke != undefined && stroke.points.length > 0) { 
                for (let i = 0; i < stroke.points.length; i++) {
                    let p = stroke.points[i];

                    if (p.x > this.x - this.img.width * 0.25 &&
                        p.x < this.x + this.img.width * 0.25 &&
                        p.y > this.y - this.img.height * 0.2 &&
                        p.y < this.y + this.img.height * 0.48) {

                        this.vy += -10000 * dt;
                        break;
                    }
                }
            }

            this.vy = this.y < 0 ? 10000 * dt : this.vy;
            this.vy = this.y > cvs.height - this.img.height * 0.58 ? -25000 * dt : this.vy;
        }
    };

    this.render = (dt, cvs = canvas, ctx = canvasContext) => {
        if (this.imgLoaded) {
            Draw.image(this.img, 0, 0, 176, 185, this.x, this.y, 176 * 0.5, 185 * 0.5);
        }
    };
};