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
		this.targets = [];

		this.fighter = null;
	}

	setupMenu() {
		this.setupSkillList();
	}

	setupSkillList() {
		this.skills.length = 0;

		for (let i = 0; i < this.fighter.skillList.length; i++) {
			let newSkill = this.fighter.skillList[i];
			let newSkillUI = new UIButton(newSkill.name, 20, 25 + (30 * i), 150, 20, this);
			newSkillUI.fighter = this.fighter;
			newSkillUI.onClick = function() {
				this.fighter.schedualedSkill = newSkill;
				this.parent.skills.length = 0;
				this.parent.setupTargetList();
			}
			newSkillUI.addToParent();

			let newLabel = new UITextLabel("skill label", 5, 15, 140, 5, newSkillUI);
			newLabel.label = newSkill.name;
			newLabel.addToParent();
		}
	}

	setupTargetList() {
		this.targets.length = 0;
		var targetFighters = GetAllMemberOfAnotherTeam(this.fighter.team);

		for (let i = 0; i < targetFighters.length; i++) {
			let newTarget = targetFighters[i];
			let newTargetUI = new UIButton(newTarget.name, 20, 25 + (30 * i), 150, 20, this);
			newTargetUI.fighter = this.fighter;
			newTargetUI.onClick = function() {
				this.fighter.schedualedTargets = [newTarget];
				this.parent.removeFromParent();
			}
			newTargetUI.addToParent();

			let newLabel = new UITextLabel("skill label", 5, 15, 140, 5, newTargetUI);
			newLabel.label = newTarget.name;
			newLabel.addToParent();
		}
	}
}