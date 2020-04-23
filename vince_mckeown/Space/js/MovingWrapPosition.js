function movingWrapPositionClass(){
	this.x;
	this.y;
	
	this.reset = function() {
		this.xv = 0;
		this.yv = 0;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
	}
		 
	this.handleScreenWrap = function(){
		if(this.x <= 0){
			this.x = canvas.width;
		}
		else if(this.x >= canvas.width){
			this.x = 0;
		}
		else if(this.y <= 0){
			this.y = canvas.height;
		}
		else if(this.y >= canvas.height){
			this.y = 0;
		}
	}	
			 
	this.movement = function() {
 
		this.x += this.xv;
		this.y += this.yv;
		
		this.handleScreenWrap();
	}	
} 