var firstPlace;
var secondPlace;
var thirdPlace;
var fourthPlace;
var fifthPlace;
var sixthPlace;
var seventhPlace;
var eigthPlace;
var firstPlaceFilled = false;
var secondPlaceFilled = false;
var thirdPlaceFilled = false;
var fourthPlaceFilled = false;
var fifthPlaceFilled = false;
var sixthPlaceFilled = false;
var seventhPlaceFilled = false;
var eigthPlaceFilled = false;

function whichPlace(whichCar, cash){
	if(!firstPlaceFilled){
		firstPlace = whichCar;
		firstPlaceFilled = true;
		cash = cash + 1000;
	} else if(!secondPlaceFilled){
		secondPlace = whichCar;
		secondPlaceFilled = true;
		cash = cash + 750;
	} else if(!thirdPlaceFilled){
		thirdPlace = whichCar;
		thirdPlacePlaceFilled = true;
		cash = cash + 500;
	} else if(!fourthPlaceFilled){
		fourthPlacePlace = whichCar;
		fourthPlacePlaceFilled = true;
		cash = cash + 250;
		console.log(whichCar, cash);
	} else if(!fifthPlaceFilled){
		fifthPlacePlace = whichCar;
		fifthPlacePlaceFilled = true;
		cash = cash + 100;
	} else if(!sixthPlaceFilled, cash){
		sixthPlace = whichCar;
		sixthPlaceFilled = true;
		cash = cash + 50;
	} else if(!seventhPlaceFilled, cash){
		seventhPlace = whichCar;
		seventhPlaceFilled = true;
		cash = cash + 25;
	} else if(!eigthPlaceFilled, cash){
		eigthPlacePlace = whichCar;
		ePlaceFilled = true;
		cash = cash + 10;
	} else {
		nextLevel();
	}
}