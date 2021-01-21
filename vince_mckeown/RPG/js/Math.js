function randomIntFromInterval(min,max){ // min and max included
	min = Math.ceil(min);
	max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)) + min;
}

function dist (x1, y1, x2, y2){
	var xd = x2 - x1;
	var yd = y2 - y1;
	return Math.sqrt(xd * xd + yd * yd);
}