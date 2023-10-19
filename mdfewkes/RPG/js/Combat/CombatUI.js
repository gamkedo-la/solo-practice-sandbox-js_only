class PlayerCombatInputEvent extends Event {
	constructor(fighter) {
		super();
		this.fighter = fighter;

		this.UI = combatUI.addPart(new PlayerBattleMenu("", this.fighter), false);

		this.UI.setupMenu();
		this.initialized = false;
	}

	Update() {
		if (!this.initialized) {
			this.UI.setActive(true);

			this.initialized = true;
		}

		return !this.UI.isActive();
	}
}

class PlayerBattleMenu extends UIElement {
	constructor(name, fighter) {
		super("Player Battle Menu " + fighter.name, 100, 300, 600, 200);

		this.fighter = fighter;

		this.label = this.addPart(new UITextLabel("name", 20, 20, 100, 20));
		this.label.label = this.fighter.name;
	}

	setupMenu() {
		this.setupSkillList();
	}

	setupSkillList() {
		this.active.length = 1;
		this.parts.length = 1;

		for (let i = 0; i < this.fighter.skillList.length; i++) {
			let newSkill = this.fighter.skillList[i];
			let newSkillUI = this.addPart(new UIButton(newSkill.name, 20, 25 + (30 * i), 150, 20));
			newSkillUI.fighter = this.fighter;
			newSkillUI.onClick = function() {
				this.fighter.schedualedSkill = newSkill;
				this.parent.setupTargetList(this);
			}

			let newLabel = newSkillUI.addPart(new UITextLabel("skill label", 5, 15, 140, 5));
			newLabel.label = newSkill.name;
			//newLabel.addToParent();
		}
	}

	setupTargetList(skillUIReference) {
		this.active.length = 1;
		skillUIReference.setActive(true);
		skillUIReference.onClick = function(){
			this.parent.setupSkillList();
		};

		var targetFighters = GetAllMemberOfAnotherTeam(this.fighter.team);

		for (let i = 0; i < targetFighters.length; i++) {
			let newTarget = targetFighters[i];
			let newTargetUI = this.addPart(new UIButton(newTarget.name, 190, 25 + (30 * i), 150, 20));
			newTargetUI.fighter = this.fighter;
			newTargetUI.onClick = function() {
				this.fighter.schedualedTargets = [newTarget];
				this.parent.removeFromParent();
			}

			let newLabel = newTargetUI.addPart(new UITextLabel("skill label", 5, 15, 140, 5, newTargetUI));
			newLabel.label = newTarget.name;
			//newLabel.addToParent();
		}
	}

	removeFromParent() {
		this.parent.removePart(this);
	}
}