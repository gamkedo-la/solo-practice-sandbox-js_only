const Net = function(cvs = canvas, ctx = canvasContext) {
    this.name = "net";
    this.w = 20;
    this.h = 300;
    this.x = cvs.width * 0.5;
    this.y = cvs.height - this.h;

    this.colCheck = new Collision();

    this.update = (dt, col) => {        
        this.x = cvs.width * 0.5;
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
                        console.log("Net detects collision!");
                    }
                }
            }
        });
    };

    this.render = dt => {
        Draw.rect(this.x, this.y, this.w, this.h, "black");
        Draw.outlineRect(this.x, this.y, this.w, this.h, "Magenta", 2);

    };
};