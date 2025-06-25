class Player extends Entity {
    constructor(name, x, y, health, damage, level, gold) {
        super(name, x, y, health, damage);
        this._level = level;
        this._gold = gold;
        this.color = "blue";
        this.image = wizardPic;
        this.sX = 32*0; //sprite sheet X pos
        this.sY = 34*2; //sprite sheet Y pos
        this.sH = 34; //sprite sheet H
        this.sW = 32; //sprite sheet W
        this.x = 32*9;
        this.y = 0;
        this.width = 32;
        this.height = 34;
    }

    // Getters
    get level() { return this._level; }
    get gold() { return this._gold; }

    // Setters
    set level(value) { this._level = Math.max(1, value); } // Prevent level from dropping below 1
    set gold(value) { this._gold = Math.max(0, value); }

    // Level up method
    levelUp() {
        this._level += 1;
        this._health += 10;  // Increase health on level up
        this._damage += 2;   // Increase attack power
        console.log(`${this.name} leveled up to ${this._level}!`);
    }
}
