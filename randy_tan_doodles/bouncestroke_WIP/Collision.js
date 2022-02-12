const Collision = function() {    
    this.isColliding = (firstX1, firstY1, firstX2, firstY2, 
                        secondX1, secondY1, secondX2, secondY2) => {
        return ((firstX1 >= secondX1 && firstX2 <= secondX2 &&
            firstY1 >= secondY1 && firstY2 <= secondY2) || 
                (firstX2 >= secondX1 && firstX1 <= secondX2 &&
            firstY2 >= secondY1 && firstY1 <= secondY2));
    };
};