class Skill {
	constructor() {

	}

	onUse(owner, targets) {

	}
}

class SkillEvent extends TimerEvent {
	constructor(owner, targets, skill, time = 1) {
		super(time);

		this.owner = owner;
		this.targets = targets;
		this.skill = skill;
	}

	onEnd() {
		if (this.owner.currentHp <= 0) return;
		this.skill.onUse(this.owner, this.targets);
	}
}

class AttackMeleeBase extends Skill {
	constructor() {
		super();
		this.power = 30;
	}

	onUse(owner, targets) {
		for (let i = 0; i < targets.length; i++) {
			let damage = (100/(100 + targets[i].meleeDefence)) * owner.meleeAttack * (this.power * 0.0135);
			targets[i].receiveDamage(damage);
		}
	}
}

class AttackRangeBase extends Skill {
	constructor() {
		super();
		this.power = 30;
	}

	onUse(owner, targets) {
		for (let i = 0; i < targets.length; i++) {
			let damage = (100/(100 + targets[i].rangedDefence)) * owner.rangedAttack * (this.power * 0.0135);
			targets[i].receiveDamage(damage);
		}
	}
}