class NPC extends Entity {
    constructor(name, x, y, dialogue) {
        super(name, x, y, 100, 0); // NPCs don't fight, so no damage
        this.width = 32;
        this.height = 32;
        this._dialogue = dialogue;
    }

    // Getter for dialogue
    get dialogue() { return this._dialogue; }

    // Setter for dialogue
    set dialogue(newDialogue) { this._dialogue = newDialogue; }

    speak() {
        console.log(`${this.name}: "${this._dialogue}"`);
    }
}
