let BoardCell = function (x = 100, y = 100, width = 30, height = 30, mouse = inputMouse) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.isMouseOver = false;

    this.parentBoard = null;
    this.childTile = null;

    this.update = function (dt, x = this.x, y = this.y, width = this.width, height = this.height) {
        if (this.x != x) this.x = x;
        if (this.y != y) this.y = y;
        if (this.width != width) this.width = width;
        if (this.height != height) this.height = height;

        this.isMouseOver = (mouse.x > this.x && mouse.x < this.x + this.width) &&
                           (mouse.y > this.y && mouse.y < this.y + this.height);  

        if (this.isMouseOver && mouse.heldObject != null && this.childTile == null &&
            !mouse.isHeldDown && !mouse.isClicked) {
            this.moveTileToThisCell(mouse.heldObject);
        }
    };

    this.render = function () {
        let bgColor = 'black';
        let lineColor = 'white';

        if (this.isMouseOver && mouse.heldObject != null) {
            bgColor = 'cyan';
            lineColor = 'white';
        }

        Draw.rect(this.x, this.y, this.width, this.height, bgColor);
        Draw.outlineRect(this.x, this.y, this.width, this.height, lineColor, 1);
    };

    this.moveTileToThisCell = function (targetTile) {
        if (targetTile != null) {
            if (targetTile.parentBoard == this.parentBoard) {
                targetTile.parentCell.childTile = null;     
                this.childTile = targetTile;
                targetTile.parentCell = this;

                this.updateBoardConfiguration();
            }
        }
    };

    this.swapTile = function (targetTile) {
        if (targetTile != null) {
            if (targetTile.parentBoard == this.parentBoard) {
                this.childTile = targetTile;
                targetTile.parentCell = this;
            }
        }
    };
   
    this.updateBoardConfiguration = function () {
        this.parentBoard.tileConfiguration = [];

        for (let i = 0; i < this.parentBoard.cellCount; i++) {
            if (this.parentBoard.cells[i].childTile == null) {
                this.parentBoard.tileConfiguration.push(null);
            }
            else {
                this.parentBoard.tileConfiguration.push(this.parentBoard.cells[i].childTile.number);
            }
        }
    };
};