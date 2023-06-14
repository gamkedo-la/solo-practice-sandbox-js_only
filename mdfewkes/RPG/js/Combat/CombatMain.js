let combatEventSequencer = new EventSequencer();
let fighters = [];
let combatUI;

function RunCombat() {
	if (combatEventSequencer.EventList.length == 0) {
		for (let i = fighters.length-1; i >= 0; i--) {
			if (fighters[i].currentHP <= 0) fighters.splice(i, 1);
		}
		for (let i = 0; i < fighters.length; i++) {
			if (fighters[i].currentHP <= 0) continue;
			combatEventSequencer.EventList.push(fighters[i].GetInputEvent());
		}
		combatEventSequencer.EventList.push({Update(){return true;}, Draw(){}, onEnd(){CalculateTurns();}});
	}

	combatEventSequencer.Update();
	combatUI.update();

	colorRect(0,0,800,600, "black");
	combatEventSequencer.Draw();
	combatUI.draw();

	for (let i = 0; i < fighters.length; i++) {
		colorText(fighters[i].name + " " + fighters[i].currentHP + "/" + fighters[i].maxHP, 20, 20 + i * 20, "white", "15px Arial");
	}
}

function SetupCombat() {
	fighters.push(new PlayerFighter());
	fighters[0].name = "Rad MDRA";
	fighters[0].meleeAttack = 80;
	fighters[0].meleeDefence = 100;
	fighters[0].rangedAttack = 100;
	fighters[0].rangedDefence = 80;
	fighters[0].team = 0;

	fighters.push(new PlayerFighter());
	fighters[1].name = "Ram MARD";
	fighters[1].meleeAttack = 100;
	fighters[1].meleeDefence = 80;
	fighters[1].rangedAttack = 80;
	fighters[1].rangedDefence = 100;
	fighters[1].team = 0;

	fighters.push(new Fighter());
	fighters[2].name = "Ted MARA";
	fighters[2].meleeAttack = 100;
	fighters[2].meleeDefence = 80;
	fighters[2].rangedAttack = 100;
	fighters[2].rangedDefence = 80;
	fighters[2].team = 1;

	fighters.push(new Fighter());
	fighters[3].name = "Tod MDRD";
	fighters[3].meleeAttack = 80;
	fighters[3].meleeDefence = 100;
	fighters[3].rangedAttack = 80;
	fighters[3].rangedDefence = 100;
	fighters[3].team = 1;

	combatUI = new UIMainInterface(screenWidth, screenHeight);
	combatUI.name = "combatUI"
}

function CalculateTurns() {
	for (let i = 0; i < fighters.length; i++) {
		let skillToAdd = new SkillEvent(fighters[i], fighters[i].schedualedTargets, fighters[i].schedualedSkill);
		combatEventSequencer.EventList.push(skillToAdd);
		//console.log(fighters[i].name + " attacks " + fighters[i].schedualedTargets[0].name);
	}
}

function GetFirstMemberOfAnotherTeam(currentTeam) {
	for (let i = 0; i < fighters.length; i++) {
		if (fighters[i].team != currentTeam) {
			return fighters[i];
		}
	}
	return null;
}

function GetAllMemberOfAnotherTeam(currentTeam) {
	let members = [];
	for (let i = 0; i < fighters.length; i++) {
		if (fighters[i].team != currentTeam) {
			members.push(fighters[i]);
		}
	}
	return members;
}

function GetAllMemberOfTeam(team) {
	let members = [];
	for (let i = 0; i < fighters.length; i++) {
		if (fighters[i].team == team) {
			members.push(fighters[i]);
		}
	}
	return members;
}