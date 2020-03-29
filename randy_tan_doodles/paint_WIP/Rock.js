let Rock = function() {
    this.x = 0;
    this.y = 0;

    this.img = document.createElement("img");
    this.img.src = "rock.png";
    this.imgLoaded = false;

    this.img.onload = () => {
        this.imgLoaded = true;
    };

    this.update = dt => {        
        this.y += 10 * dt;
    };

    this.render = (dt, cvs = canvas, ctx = canvasContext) => {
        if (this.imgLoaded) {
            Draw.image(this.img, 0, 0, 176, 185, cvs.width * 0.5 - this.img.width * 0.25, this.y, 176 * 0.5, 185 * 0.5);
        }
    };
};