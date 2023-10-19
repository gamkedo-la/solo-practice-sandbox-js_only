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
		this.schedualedTargets = [];

		this.team = 0;
	}

	GetInputEvent() {
		return new Event();
	}

	receiveDamage(amount) {
		//console.log(this.name + " receiveDamage " + amount);
		// this.currentHP -= roundToDecimalPlace(amount, 0);

		// if (this.currentHP < 0) this.currentHP = 0;
		// if (this.currentHP > this.maxHP) this.currentHP = this.maxHP;

		var targetHP = roundToDecimalPlace(this.currentHP - amount);
		if (targetHP < 0) targetHP = 0;
		if (targetHP > this.maxHP) targetHP = this.maxHP;

		combatEventSequencer.AddFirstEvent(new ParameterLerpEvent("currentHP", this, this.currentHP, targetHP));
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

class ComputerFighter extends Fighter {
	GetInputEvent() {
		if (this.currentHP == 0) return new Event();

		let inputEvent = new TimerEvent(0.5);
		inputEvent.fighter = this;
		inputEvent.onEnd = function() {
			this.fighter.schedualedSkill = rndOneFromList(this.fighter.skillList);
			this.fighter.schedualedTargets = [rndOneFromList(GetAllMemberOfAnotherTeam(this.fighter.team))];
		}
		return inputEvent;
	}
}