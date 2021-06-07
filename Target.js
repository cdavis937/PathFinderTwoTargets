class Target {

    constructor(end){

        this.size = 20;

        this.yShift = 50;

        //Place the target in the first box or the last box
        if(end){
            this.x = Math.floor(windowWidth/this.size) - 1;
            this.y = Math.floor((windowHeight-this.yShift)/this.size) - 1;
        }else{
            this.x = 0;
            this.y = 0;
        }
        
        this.xMax = Math.floor(windowWidth / this.size);
        this.yMax = Math.floor((windowHeight - this.yShift) / this.size);

        this.end = end;

        this.pressed = false;

        this.canMove = true;

    }

    /*
    * Create three circles to make a target look alike
    */
    drawStart(){
        fill(0,255,0);
        ellipse((this.x + .5) * this.size, (this.y + .5) * this.size + this.yShift, this.size, this.size);
        
        fill(255,255,255)
        ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/1.5, this.size/1.5);
    
        fill(0,255,0);
        ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/2.5, this.size/2.5);
    }

    /*
    * Create three circles to make a target look alike
    */
    drawEnd(){
        fill(0,255,255);
        ellipse((this.x + .5) * this.size, (this.y + .5) * this.size + this.yShift, this.size, this.size);
        
        fill(255,255,255)
        ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/1.5, this.size/1.5);
    
        fill(0,255,255);
        ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/2.5, this.size/2.5);
    }

    /*
    * Updates the position of the target in the object
    */
    updatePos(target1){

        if(mouseIsPressed && this.canMove){
            
            let xPrev = this.x;
            let yPrev = this.y;

            let xCur = Math.floor(mouseX/this.size);
            let yCur = Math.floor((mouseY - this.yShift)/this.size);

            //As long as the cursor is pressed over the target
            if (yPrev == yCur){
                if(xPrev == xCur){
                    this.pressed = true;
                }
            }
        }else{
            this.pressed = false;
        }

        if(this.pressed){
            
            //As long as the mouse is in the grid move it around
            if(mouseY > this.yShift && mouseY < this.yMax * this.size + this.yShift && mouseX < this.xMax * this.size && mouseX > 0){
                
                let pos = [...target1.returnPos()];

                let x = Math.floor((mouseX)/this.size);
                let y = Math.floor((mouseY - this.yShift)/this.size);

                //Move it to any postion as long as it is not over the other target
                if(pos[0] != x || pos[1] != y){
                    this.x = x;
                    this.y = y;
                }

            }
            
        }

        


    }

    /*
    * Return the x and y of the target
    */
    returnPos(){
        return [this.x, this.y];
    }

};