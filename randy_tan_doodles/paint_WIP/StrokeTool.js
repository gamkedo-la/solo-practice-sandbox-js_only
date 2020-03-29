let StrokeTool = new function() {
    this.drawX = 0;
    this.drawY = 0;
    this.isDrawing = false;
    this.points = [];
    this.size = 10;
    this.margin = 0;

    let x1, y1, x2, y2;

    this.update = input => {
        if (input.isDown) {
            this.drawX = input.x;
            this.drawY = input.y;
            this.points.push({ 'x': this.drawX, 'y': this.drawY, 'isDrawing': this.isDrawing });
            x1 = this.points[0].x;
            y1 = this.points[0].y;
            this.isDrawing = true;
        }
        
        if (this.isDrawing) {
            if (input.isMoving) {
                this.drawX = input.x;
                this.drawY = input.y;
                this.points.push({ 'x': this.drawX, 'y': this.drawY, 'isDrawing': this.isDrawing });
                x2 = this.points[this.points.length - 1].x;
                y2 = this.points[this.points.length - 1].y;
            }

            if (!input.isDown) {
                this.isDrawing = false;
                this.points = [];
            }
        }

        return { 
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2
        };
    };

    this.render = input => {
        Draw.rect(input.x - this.size * 0.5, input.y - this.size * 0.5, this.size, this.size, 'black');
        // Draw.colorCircle(input.x, input.y, this.size, 'black'); 
        for (let i = 0; i < this.points.length; i++) {
            if (i > 0) {
                this.drawX = this.points[i - 1].x;
                this.drawY = this.points[i - 1].y;            
            }
    
            if (this.points[i].isDrawing) {
                Draw.follow(this.drawX, this.drawY, this.points[i].x, this.points[i].y, 'black', this.size);
            }
            this.drawX = this.points[i].x;
            this.drawY = this.points[i].y;
        }
    };
};