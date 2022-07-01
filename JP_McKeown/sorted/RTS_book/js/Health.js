function showHealth(atX, atY) {
  //var u, topLeftX, topLeftY = null;

  // check all units if in range
  for(var i = 0; i < allUnits.length; i++) {
    var distFromMouse = allUnits[i].distFrom(atX, atY);

    if(distFromMouse < 40) {
      console.log(i + " distance " + distFromMouse)
      // u = allUnits[i];
      // topLeftX = u.x - HEALTH_BOX_SIZE * 2;
      // topLeftY = u.y - HEALTH_BOX_SIZE * 2;
      
      // for(var i = 0; i < MAX_HEALTH; i++) {
      //   topLeftX = topLeftX + HEALTH_BOX_SIZE;
      //   lineColor = "black"; 
      //   colorOutlineRectCornerToCorner(topLeftX, topLeftY, topLeftX+HEALTH_BOX_SIZE, topLeftY+HEALTH_BOX_SIZE, lineColor); 
      //   //console.log(u.x + " " + u.y + " " + topLeftX + " " + topLeftY)
      // }   

      // healthColor = "red";      
      // if(u.health >= HEALTH_HIGH) {
      //   healthColor = "green";
      // } else if(u.health > HEALTH_MED) {
      //   healthColor = "yellow";
      // }
      // var topLeftX = u.x - HEALTH_BOX_SIZE * 2;
      // for(var i = 0; i < u.health; i++) {
      //   topLeftX = topLeftX + HEALTH_BOX_SIZE;
      //   colorRect(topLeftX+1, topLeftY+1, HEALTH_BOX_SIZE-2, HEALTH_BOX_SIZE-2, healthColor); 
      // }   
    }
  }
}