$(document).ready(function() {
  
  var sound = $("#sound")[0];
  var sessionCount = parseInt($("#sessionLength").html());
  var breakCount = parseInt($("#breakLength").html());
  var isPaused = false;
  var isStarted = false;
  var sessionCounter;  
  var sessCountDown;
  var brkCountDown;
  var startBreak;
  
  $("#pause").hide();
  
  $("#sessionMinus").click(function() {
    if (sessionCount > 5) {
      sessionCount -= 5;
      $("#sessionLength").html(sessionCount);
      $("#clocking").html(sessionCount + ":" + "00");
    }
  });
  
  $("#sessionPlus").click(function() {
    sessionCount += 5;
    $("#sessionLength").html(sessionCount);
    $("#clocking").html(sessionCount + ":" + "00");
  });
  
  $("#breakMinus").click(function() {
    if (breakCount > 1) {
      breakCount -= 1;
      $("#breakLength").html(breakCount);
    }
  });
  
  $("#breakPlus").click(function() {
    breakCount += 1;
    $("#breakLength").html(breakCount);
  });
  
  $("#reset").click(function() {
    $("#sessionLength").html(25);
    $("#breakLength").html(5);
    $("#status").html("Session");
    
    sessionCount = parseInt($("#sessionLength").html());
    breakCount = parseInt($("#breakLength").html());
    isStarted = false;
    
    $("#start, #sessionMinus, #sessionPlus, #breakMinus, #breakPlus").show();
    $("#pause").hide();
    
    $("#clocking").html("25:00");
  });
  
  $("#start").click(function() {
    $("#start, #sessionMinus, #sessionPlus, #breakMinus, #breakPlus").hide();
    $("#pause").show();
    
    
    if (!isStarted) {
      sessionCounter = setInterval(timer, 1000);
      sessCountDown = sessionCount * 60;
      brkCountDown = breakCount * 60;
      
      isStarted = true;
    };
    
    $("#pause").click(function() {     
      isPaused = true;
      
      $("#start").show();
      $("#pause").hide();
    });
    
    $("#start").click(function() {      
      isPaused = false;
      
      $("#start").hide();
      $("#pause").show();
    });
    
    function timer() {      
      
      if (!isPaused) {
        sessCountDown -= 1;
        
        if (sessCountDown === 0) {
          sound.play();
          clearInterval(sessionCounter);
          startBreak = setInterval(breakTimer, 1000);

          $("#status").html("Break");
        }
        
      }
 
      if (sessCountDown % 60 >= 10) {
        $("#clocking").html((Math.floor(sessCountDown / 60)) + ":" + (sessCountDown % 60));
      } else if (sessCountDown === 0) {
        $("#clocking").html("Break!");
      } else {
        $("#clocking").html((Math.floor(sessCountDown / 60)) + ":" + "0" + (sessCountDown % 60));
      }
      
      function breakTimer() {
        
        if (!isPaused) {
          brkCountDown -= 1;
          
          if (brkCountDown === 0) {
            sound.play();
            clearInterval(startBreak);
          } 
        }     
   
        if (brkCountDown % 60 >= 10) {
          $("#clocking").html((Math.floor(brkCountDown / 60)) + ":" + (brkCountDown % 60));
        } else {
          $("#clocking").html((Math.floor(brkCountDown / 60)) + ":" + "0" + (brkCountDown % 60));
        }
      }
      
      $("#reset").click(function() {
        clearInterval(sessionCounter);
        clearInterval(startBreak);
      });
    }
  });
  
});