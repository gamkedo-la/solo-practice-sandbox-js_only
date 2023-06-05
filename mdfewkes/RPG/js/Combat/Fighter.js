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

	GetInputEvent() {
		if (this.currentHP == 0) return new Event();

		let inputEvent = new TimerEvent(1);
		inputEvent.fighter = this;
		inputEvent.onEnd = function() {
			this.fighter.schedualedSkill = rndOneFromList(this.fighter.skillList);
		}
		return inputEvent;
	}

	receiveDamage(amount) {
		//console.log(this.name + " receiveDamage " + amount);
		this.currentHP -= roundToDecimalPlace(amount, 0);

		if (this.currentHP < 0) this.currentHP = 0;
		if (this.currentHP > this.maxHP) this.currentHP = this.maxHP;
	}
}

class PlayerFighter extends Fighter {
	GetInputEvent() {
		if (this.currentHP == 0) return new Event();

		let inputEvent = new PlayerCombatInputEvent(this);
		inputEvent.fighter = this;
		return inputEvent;
	}
}