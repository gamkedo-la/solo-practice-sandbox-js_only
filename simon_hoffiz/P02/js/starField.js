function starInit() {
	for(var i=0; i<500; i++) {
		starList.push({x:Math.random()*c.width, y:Math.random()*c.height, sz:Math.random()*4});
	}
}

function starDraw() {
	for(var i=0; i<starList.length; i++) {
		colorRect(starList[i].x, starList[i].y, starList[i].sz, starList[i].sz, 'white');
	}
}

function starMove() {
	for(var i=0; i<starList.length; i++) {
		starList[i].y += starList[i].sz * 0.5;
		if(starList[i].y > c.height) {
			starList[i].x = c.width * Math.random();
			starList[i].y = 0;
		}
	}
}