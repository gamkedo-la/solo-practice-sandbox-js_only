var carPic = document.createElement("img");
var car2Pic = document.createElement("img");

var trackPix = new Array();

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady()
{
    picsToLoad--;
    if (picsToLoad == 0)
    {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, filename)
{
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "Images/" + filename;
}

function loadImageForTrackCode(trackCode, filename)
{
    trackPix[trackCode] = document.createElement("img");
    beginLoadingImage(trackPix[trackCode], filename);
}

function loadImages()
{
    var imageList = [
        {varName: carPic, theFile: "Car.png"},
        {varName: car2Pic, theFile: "spaceship_40x40.png"},
        {trackType: TRACK_ROAD, theFile: "sand.png"},
        {trackType: TRACK_WALL, theFile: "TrackWall2.png"},
        {trackType: TRACK_TREE, theFile: "Tree.png"},
        {trackType: TRACK_FLAG, theFile: "Flag.png"},
        {trackType: TRACK_GOAL, theFile: "Goal.png"},
    ]

    picsToLoad = imageList.length;

    for (var i = 0; i < picsToLoad; i++)
    {
        if (imageList[i].varName != undefined)
        {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        }
        else
        {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
    }
}