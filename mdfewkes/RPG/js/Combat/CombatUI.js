class PlayerCombatInputEvent extends Event {
	constructor(fighter) {
		super();
		this.fighter = fighter;
		this.UI = new PlayerBattleMenu("", 0, 0, 0, 0, combatUI);
		this.UI.label.label = fighter.name;
		combatUI.addPart(this.UI);
	}

	Update() {
		return !this.UI.isActive();
	}
}

class PlayerBattleMenu extends UIButton {
	constructor(name, x, y, w, h, parent) {
		super("Player Battle Menu", 100, 100, 200, 400, parent);

		this.label = new UITextLabel("name", 20, 20, 100, 20, this);
		this.addPart(this.label);
	}

	onClick() {
		this.parent.removePart(this);
	}

}