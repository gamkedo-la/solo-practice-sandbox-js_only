const Net = function(cvs = canvas, ctx = canvasContext) {
    this.name = "net";
    this.w = 20;
    this.h = 300;
    this.x = cvs.width * 0.5;
    this.y = cvs.height - this.h;

    this.vibration = 0;

    this.colCheck = new Collision();
    
    this.sfx = new Audio();

    this.sfx.src = './bounce.wav';

    this.update = (dt, col) => {                
        this.y = cvs.height - this.h;

        col.forEach(c => {
            if (c) {      
                if (c.name == "stroke tool") {
                    
                }
                
                if (c.name == "rock") {
                    // console.log(this.x, this.y, this.x + this.w, this.y + this.h)
                    // console.log(c.x1, c.y1, c.x2, c.y2)

                    if (this.colCheck.isColliding(
                        this.x, this.y, this.x + this.w, this.y + this.h,
                        c.x1, c.y1, c.x2, c.y2)) {
                        this.sfx.play();
                        console.log("Net detects collision!");
                        
                        if (c.x1 < this.x) {                            
                            this.vibration += 70;
                        }
                        else if (c.x2 > this.x + this.w) {
                            this.vibration -= 70;
                        }
                    }
                }
            }
        });

        if (Math.abs(this.vibration) > 0) {
            if (this.vibration > 0)
                this.vibration -= 1000 * dt;
            else if (this.vibration < 0)
                this.vibration += 1000 * dt;
        }

        if (this.x > cvs.width * 0.5) {
            this.x -= 100 * dt;
        }
        if (this.x < cvs.width * 0.5) {
            this.x += 100 * dt;
        }

        this.x += this.vibration * dt;
    };

    this.render = dt => {
        Draw.rect(this.x, this.y, this.w, this.h, "black");
        Draw.outlineRect(this.x, this.y, this.w, this.h, "Magenta", 2);
    };
};
