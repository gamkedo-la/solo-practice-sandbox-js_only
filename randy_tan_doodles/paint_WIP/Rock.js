let Rock = function(cvs = canvas) {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

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

            this.x1 = this.x + 14;
            this.y1 = this.y + 14;
            this.x2 = this.x + this.img.width * 0.40;
            this.y2 = this.y + this.img.height * 0.40;

            if (stroke != undefined && stroke.points.length > 0) { 
                for (let i = 0; i < stroke.points.length; i++) {
                    let p = stroke.points[i];
                    if (p.x > this.x1 && p.x < this.x2 &&
                            p.y > this.y1 && p.y < this.y2) {
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
            
            Draw.outlineRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1, "Magenta", 2);
        }
    };
};