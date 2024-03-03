let player;

function RunExplore(deltaTime) {

	player.Update(deltaTime);
	
	colorRect(0,0,800,600, "black");
	player.Draw();
	
}

function SetupExplore() {
	player = new Player();
}