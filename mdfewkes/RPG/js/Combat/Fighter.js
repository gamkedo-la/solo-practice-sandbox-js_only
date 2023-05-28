class Fighter {
	constructor() {
		this.name = "";
		this.maxHP = 100;
		this.currentHP = this.maxHP;
		this.meleeAttack = 100;
		this.meleeDefence = 100;
		this.rangedAttack = 100;
		this.rangedDefence = 100;

		this.skillList = [new AttackMeleeBase(), new AttackRangeBase()];
		this.schedualedSkill = null;

		this.team = 0;
	}

	GetInputEvent(fighterInitiativeIndex) {
		if (this.currentHP == 0) return new Event();

		let inputEvent = new TimerEvent(0,1);
		inputEvent.fighter = this;
		inputEvent.onEnd = function() {
			this.fighter.schedualedSkill = rndOneFrom(this.fighter.skillList);
		}
		return inputEvent;
	}

	receiveDamage(amount) {
		console.log(this.name + " receiveDamage " + amount);
		this.currentHP -= roundToDecimalPlace(amount, 0);

		if (this.currentHP < 0) this.currentHP = 0;
	}
}

class Skill {
	constructor() {

	}

	onUse(owner, targets) {

	}
}

class SkillEvent extends TimerEvent {
	constructor(owner, targets, skill) {
		super();

		this.owner = owner;
		this.targets = targets;
		this.skill = skill;
	}

	onEnd() {
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