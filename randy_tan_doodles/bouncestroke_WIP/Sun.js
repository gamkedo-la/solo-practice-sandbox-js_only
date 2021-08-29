const Sun = function(cvs = canvas, ctx = canvasContext) {
    this.x = 50;
    this.y = 200;    

    this.img = document.createElement("img");
    this.img.src = "sun_sheet.png";
    this.imgLoaded = false;

    this.sprite = null;

    this.moveDirectionY = -1;

    this.img.onload = () => {
        this.imgLoaded = true;        
        this.sprite = new AnimatedSprite(new Sprite(this.img, 128, 128, 1, 3, 3), 200);
    };

    this.update = (dt, col) => {
        if (this.imgLoaded) {
            this.x += 10 * dt;
            this.y += this.moveDirectionY * 5 * dt;

            if (this.x > cvs.width + 130) {
                this.x = -128;
            }
            if (this.y < 50) {
                this.moveDirectionY = 1;
            }
            if (this.y > 200) {
                this.moveDirectionY = -1;
            }
        }
    };

    this.render = dt => {
        if (this.imgLoaded) {
            this.sprite.draw(this.x, this.y, dt);
        }
    };
};