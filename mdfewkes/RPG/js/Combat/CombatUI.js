class PlayerCombatInputEvent extends Event {
	constructor(fighter) {
		super();
		this.fighter = fighter;

		this.UI = new PlayerBattleMenu("", 0, 0, 0, 0, combatUI);
		this.UI.addToParent();
		this.UI.label.label = fighter.name;
		this.UI.fighter = this.fighter;

		this.UI.setupMenu();
	}

	Update() {
		return !this.UI.isActive();
	}
}

class PlayerBattleMenu extends UIElement {
	constructor(name, x, y, w, h, parent) {
		super("Player Battle Menu", 100, 300, 600, 200, parent);

		this.label = new UITextLabel("name", 20, 20, 100, 20, this);
		this.addPart(this.label);

		this.skills = [];

		this.fighter = null;
	}

	setupMenu() {
		this.skills.length = 0;

		for (let i = 0; i < this.fighter.skillList.length; i++) {
			let newSkill = this.fighter.skillList[i];
			let newSkillUI = new UIButton(newSkill.name, 20, 25 + (30 * i), 150, 20, this);
			newSkillUI.fighter = this.fighter;
			newSkillUI.onClick = function() {
				this.fighter.schedualedSkill = newSkill;
				this.parent.removeFromParent();
			}
			newSkillUI.addToParent();

			let newLabel = new UITextLabel("skill label", 5, 15, 140, 5, newSkillUI);
			newLabel.label = newSkill.name;
			newLabel.addToParent();
		}
	}
}