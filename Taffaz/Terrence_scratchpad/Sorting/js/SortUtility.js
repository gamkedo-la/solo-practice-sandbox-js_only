var sortedCount = 0;
var step = 0;

const BUBBLE_SORT = "bubble sort";
const INSERTION_SORT = "insertion sort";
var sortTypes = [BUBBLE_SORT, INSERTION_SORT];

var sortStates = {
	activated: false,
	visualize: false,
	selected: sortTypes[1],
};

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function swap(arr,i,j) {
	var hold;
	hold = arr[i].id;
	arr[i].id = arr[j].id;
	arr[j].id = hold;
}

function isSortFinished() {
	if (sortedCount < numOfElements - 1) {
		return false;
	}
	console.log("finished looping");
	sortedCount = 0;
	console.log("n = " + step);
	step = 0;
	sortStates.activated = false;
	return true;
}