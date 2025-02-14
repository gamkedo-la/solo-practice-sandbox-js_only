class Monster extends Entity {
    constructor(name, x, y, health, damage, loot) {
        super(name, x, y, health, damage);
        this._loot = loot;  // e.g., gold or items
        this.color = "red";
        this.width = 32;
        this.height = 32;
    }

    // Getter for loot
    get loot() { return this.loot; }

    // Monster attack method
    attack(target) {
        if (target instanceof Player) {
            target.health -= this.damage;
            console.log(`${this.name} attacks ${target.name} for ${this.damage} damage!`);
        }
    }
}
