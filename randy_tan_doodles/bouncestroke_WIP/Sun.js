const Sun = function(cvs = canvas, ctx = canvasContext) {
    this.x = 100;
    this.y = 100;    

    this.img = document.createElement("img");
    this.img.src = "sun_sheet.png";
    this.imgLoaded = false;

    this.sprite = null;

    this.img.onload = () => {
        this.imgLoaded = true;        
        this.sprite = new AnimatedSprite(new Sprite(this.img, 128, 128, 1, 3, 3), 200);
    };

    this.update = (dt, col) => {
        if (this.imgLoaded) {
            
        }
    };

    this.render = dt => {
        if (this.imgLoaded) {
            this.sprite.draw(this.x, this.y, dt);
        }
    };
};