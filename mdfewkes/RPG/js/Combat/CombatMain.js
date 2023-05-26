let combatEventSequencer = new EventSequencer();
let fighters = [];

function RunCombat() {
	if (combatEventSequencer.EventList.length == 0) {
		for (let i = 0; i < fighters.length; i++) {
			combatEventSequencer.EventList.push(fighters[i].GetInputEvent());
		}
		combatEventSequencer.EventList.push({Update(){CalculateTurns();return true;}, Draw(){}, onEnd(){}});
	}

	combatEventSequencer.Update();

	colorRect(0,0,800,600, "black");
	combatEventSequencer.Draw();

	for (let i = 0; i < fighters.length; i++) {
		colorText(fighters[i].currentHP + "/" + fighters[i].maxHP, 20, 20 + i * 20, "white", "15px Arial");
	}
}

function SetupCombat() {
	fighters.push(new Fighter());
	fighters[0].name = "Rad";
	fighters[0].meleeAttack = 80;
	fighters[0].meleeDefence = 100;
	fighters[0].rangedAttack = 100;
	fighters[0].rangedDefence = 80;

	fighters.push(new Fighter());
	fighters[1].name = "Ram";
	fighters[1].meleeAttack = 100;
	fighters[1].meleeDefence = 80;
	fighters[1].rangedAttack = 80;
	fighters[1].rangedDefence = 100;

	fighters.push(new Fighter());
	fighters[2].name = "Ted";
	fighters[2].meleeAttack = 100;
	fighters[2].meleeDefence = 80;
	fighters[2].rangedAttack = 100;
	fighters[2].rangedDefence = 80;

	fighters.push(new Fighter());
	fighters[3].name = "Tod";
	fighters[3].meleeAttack = 80;
	fighters[3].meleeDefence = 100;
	fighters[3].rangedAttack = 80;
	fighters[3].rangedDefence = 100;
}

function CalculateTurns() {
	for (let i = 0; i < fighters.length; i++) {
		let skillToAdd = new SkillEvent(fighters[i], [fighters[rndInt(4)]], fighters[i].schedualedSkill);
		combatEventSequencer.EventList.push(skillToAdd);
	}
}