class SkillEvent extends TimerEvent {
	constructor(fighter, targets, skill, time = 1) {
		super(time);

		this._fighter = fighter;
		this._targets = targets;
		this._skill = skill;

		this.name = this._skill.name;
	}

	onEnd() {
		if (this._fighter.currentHP <= 0) return;
		console.log(this._fighter.currentHP + " " + this._fighter.name);

		var noLivingTarget = true;
		for (var i = 0; i < this._targets.length; i++) {
			if (this._targets[i].currentHP > 0) {
				noLivingTarget = false
			}
		}

		if (noLivingTarget) {
			this._targets = [rndOneFromList(GetAllMemberOfAnotherTeam(this._fighter.team))];
			if (this._targets == null) {
				return;
			}
		}

		this._skill.onUse(this._fighter, this._targets);
		console.log(this._fighter.name + " " + this._skill.name + " " + this._targets[0].name);
	}
}

class Skill {
	constructor() {
		this.name = "Skill";
	}
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