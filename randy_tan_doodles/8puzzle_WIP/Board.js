let Boards = [];

let Board = function (x = 100, y = 100, rows = 3, columns = 3, tileWidth = 30, tileHeight = 30) {
    this.startPos = {x: x, y: y};
    this.rows = rows;
    this.columns = columns;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight; 
    
    Boards.push(this);
    this.index = Boards.indexOf(this);
    
    this.cells = [];
    this.cellCount = this.rows * this.columns;

    this.tileConfiguration = [];

    for (let i = 0, number = 1; i < this.rows; i++) {        
        for (let j = 0; j < this.columns; j++) {
            let cell = new BoardCell(this.startPos.x + j * this.tileWidth, this.startPos.y + i * this.tileHeight);
            
            let maxTileCount = this.rows * this.columns - 1;
            if (this.cells.length < maxTileCount) {
                let tile = new Tile(number, cell.x, cell.y);
                tile.parentBoard = this;                
                tile.parentCell = cell;
                cell.childTile = tile;
                number++;
            }
            cell.parentBoard = this;
            this.cells.push(cell);
        }
    }

    this.update = function (dt) {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].update(dt);
        }       
    };

    this.render = function () {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].render();
        }
    };

    this.configureBoard = function (configArray, dt) {             
        for (let cellIndex = 0; cellIndex < this.cells.length; cellIndex++) {   // Loop through every cell on the current board            
            console.log("index " + cellIndex + ": " + configArray[cellIndex]);
            let tile = this.getTileWithMatchingNumber(configArray[cellIndex]);
            console.log(tile);
            
            let cell = this.cells[cellIndex];            
            if (this.cells[cellIndex].childTile != null) {                
                let number = cell.childTile.number;    
                if (number != configArray[cellIndex]) {
                    let removed = this.cells[cellIndex];
                    this.cells.splice(cellIndex, 1);
                    if (tile) {
                        this.cells.splice(cellIndex, 0, tile.parentCell);
                    }
                    this.cells.push(removed);
                }
            }
            else {
                continue;
            }            
        }
        console.log("------------------")
        for (let i = 0; i < this.cells.length; i++) {
            console.log(this.cells[i].childTile);
        }
    };

    this.getBlankCell = function () {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].childTile == null) {
                return this.cells[i];
            }
        }
        return false;
    };

    this.getTileWithMatchingNumber = function (number) {
        // Find matching tile
        for (let i = 0; i < this.cells.length; i++) {            
            if (number != null) {
                if (this.cells[i].childTile != null) {
                    if (this.cells[i].childTile.number == number) {
                        return this.cells[i].childTile;
                    }
                }
            }
            else if (number == null) {
                if (this.cells[i].childTile == null) {
                    return this.cells[i].childTile;
                }
            }
        }
    };
};