const Net = function(cvs = canvas, ctx = canvasContext) {
    this.name = "net";
    this.w = 20;
    this.h = 300;
    this.x = cvs.width * 0.5;
    this.y = cvs.height - this.h;

    this.update = dt => {        
        
    };

    this.render = dt => {
        Draw.rect(this.x, this.y, this.w, this.h, "black");
    };
};