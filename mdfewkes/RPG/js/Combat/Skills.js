class SkillEvent extends TimerEvent {
	constructor(fighter, targets, skill, time = 1) {
		super(time);

		this.fighter = fighter;
		this.targets = targets;
		this.skill = skill;

		this.name = "Skill";
	}

	onEnd() {
		if (this.fighter.currentHp <= 0) return;
		this.skill.onUse(this.fighter, this.targets);
		console.log(this.fighter.name + " " + this.skill.name);
	}
}

class Skill {
	constructor() {

	}

	onUse(owner, targets) {

	}
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