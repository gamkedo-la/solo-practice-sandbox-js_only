class SkillEvent extends TimerEvent {
	constructor(fighter, targets, skill, time = 1) {
		super(time);

		this.fighter = fighter;
		this.targets = targets;
		this.skill = skill;

		this.name = "Skill";
	}

	onEnd() {
		if (this.fighter.currentHP <= 0) return;
		console.log(this.fighter.currentHP + " " + this.fighter.name);

		var noLivingTarget = true;
		for (var i = 0; i < this.targets.length; i++) {
			if (this.targets[i].currentHP > 0) {
				noLivingTarget = false
			}
		}

		if (noLivingTarget) {
			this.targets = [rndOneFromList(GetAllMemberOfAnotherTeam(this.fighter.team))];
			if (this.targets == null) {
				return;
			}
		}

		this.skill.onUse(this.fighter, this.targets);
		console.log(this.fighter.name + " " + this.skill.name + " " + this.targets[0].name);
	}
}

class Skill {
	constructor() {}
	onUse(owner, targets) {}
}

class AttackMeleeBase extends Skill {
	constructor() {
		super();
		this.power = 30;

		this.name = "Melee Attack";
	}

	onUse(fighter, targets) {
		for (let i = 0; i < targets.length; i++) {
			let damage = (100/(100 + targets[i].meleeDefence)) * fighter.meleeAttack * (this.power * 0.0135);
			targets[i].receiveDamage(damage);
		}
	}
}

class AttackRangeBase extends Skill {
	constructor() {
		super();
		this.power = 30;

		this.name = "Range Attack";
	}

	onUse(fighter, targets) {
		for (let i = 0; i < targets.length; i++) {
			let damage = (100/(100 + targets[i].rangedDefence)) * fighter.rangedAttack * (this.power * 0.0135);
			targets[i].receiveDamage(damage);
		}
	}
}