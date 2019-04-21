let Tiles = [];

let Tile = function (number, 
                     x = canvas.width / 2, 
                     y = canvas.height / 2, 
                     width = 30, 
                     height = 30,
                     mouseOverColor = 'cyan',
                     fontSize = 20, 
                     lineWidth = 2, 
                     fontColor = 'blue', 
                     bgColor = 'white', 
                     lineColor = 'blue', 
                     mouse = inputMouse,
                     canvasContext = ctx
                     ) {
    this.number = number;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouseOverColor = mouseOverColor;
    this.fontSize = fontSize;
    this.lineWidth = lineWidth;
    this.fontColor = fontColor;
    this.bgColor = bgColor;
    this.lineColor = lineColor;

    this.isMouseOver = false;
    this.isHeld = false;

    this.parentBoard = null;
    this.parentCell = null;

    Tiles.push(this);
    
    this.update = function (dt, 
                            x = this.x, 
                            y = this.y, 
                            width = this.width, 
                            height = this.height, 
                            fontSize = this.fontSize, 
                            fontColor = this.fontColor
                            ) {

        if (this.x != x) this.x = x;
        if (this.y != y) this.y = y;
        if (this.width != width) this.width = width;
        if (this.height != height) this.height = height;
        if (this.fontSize != fontSize) this.fontSize = fontSize;
        if (this.fontColor != fontColor) this.fontColor = fontColor;
        
        this.isMouseOver = (mouse.x > this.x && mouse.x < this.x + this.width) &&
                           (mouse.y > this.y && mouse.y < this.y + this.height);     
                           
        this.updateHold(dt);        
    };



    this.render = function () {        
        bgColor = this.isMouseOver ? this.mouseOverColor : this.bgColor;
        Draw.rect(this.x, this.y, this.width, this.height, bgColor);                
        Draw.outlineRect(this.x, this.y, this.width, this.height, lineColor, lineWidth);

        if (this.isHeld) {
            Draw.outlineRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4, lineColor, lineWidth);
        }

        Draw.text(number,
                  this.x + (this.width / 2) - this.fontSize / 4,
                  this.y + (this.width / 2) + this.fontSize / 4,
                  this.fontSize,
                  'Arial',
                  fontColor);
    };



    this.updateHold = function (dt) {
        if (mouse.heldObject == null) {
            if (this.isMouseOver && mouse.isClicked) {
                this.isHeld = true;
            }
            
            if (this.isMouseOver && mouse.isHeldDown) {
                this.isHeld = true;            
            }
        }

        if (this.isHeld) {
            this.x = mouse.x - this.width / 2;
            this.y = mouse.y - this.height / 2;
            
            if (mouse.heldObject != this) {
                mouse.heldObject = this;
                
                // When held by mouse, render at the top-most layer
                this.renderAtTopMostLayer();
            }            
        }
        else {
            this.tweenToParentCellPosition(dt);
        }
        
        if (this.isMouseOver) {
            
        }

        if (!mouse.isHeldDown && !mouse.isClicked) {
            if (mouse.heldObject != null) {
                if (this.parentBoard != null) {                    
                    let cellMinX = this.parentBoard.cells[0].x;
                    let cellMinY = this.parentBoard.cells[0].y;
                    let cellMinWidth = this.parentBoard.cells[0].width;
                    let cellMinHeight = this.parentBoard.cells[0].height;                        
                    
                    let lastCellIndex = this.parentBoard.cells.length - 1;

                    let cellMaxX = this.parentBoard.cells[lastCellIndex].x;
                    let cellMaxY = this.parentBoard.cells[lastCellIndex].y;
                    let cellMaxWidth = this.parentBoard.cells[lastCellIndex].width;
                    let cellMaxHeight = this.parentBoard.cells[lastCellIndex].height;

                    let withinBounds = this.x > cellMinX && this.x < cellMaxX + cellMaxWidth &&
                                       this.y > cellMinY && this.y < cellMaxY + cellMaxHeight &&
                                       this.x + this.width > cellMinX && this.x + this.width < cellMaxX + cellMaxWidth &&
                                       this.y + this.height > cellMinY && this.y + this.height < cellMaxY + cellMaxHeight;

                    if (!withinBounds) {
                        this.tweenToParentCellPosition(dt);
                    }
                }
            }            
            
            this.isHeld = false;
            mouse.heldObject = null;            
        }
    };

    this.renderAtTopMostLayer = function (target = this) {
        // When held by mouse, render at the top-most layer
        let heldIndex = Tiles.indexOf(target);
        if (heldIndex != Tiles.length - 1) {                
            Tiles.splice(heldIndex, 1);
            Tiles.push(target);                
        }  
    };

    this.tweenToPosition = function (dt, x, y, speed = 10) {
        this.x = x;
        this.y = y;
    };

    this.tweenToParentCellPosition = function (dt, speed = 10, x = this.parentCell.x, y = this.parentCell.y) {
        this.x = x;
        this.y = y;
    };
};