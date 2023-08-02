let player;

function RunExplore() {

	player.Update();
	
	colorRect(0,0,800,600, "black");
	player.Draw();
	
}

function SetupExplore() {
	player = new Player();
}