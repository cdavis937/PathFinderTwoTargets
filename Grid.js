class Grid {

    constructor(){
        
      this.size = 20;
      this.xStart = 0;
      this.yStart = windowHeight/10;
      this.grid = [[]];
      this.gridColor = [[]];
      this.gridNum = [[]];

      this.yShift = 50;

      this.xMax = Math.floor(windowWidth / this.size);
      this.yMax = Math.floor((windowHeight - this.yShift) / this.size);

      this.max = this.xMax > this.yMax ? this.xMax: this.yMax;

      let y = 0;
        

      while(y < this.yMax){

        let x = 0;
        this.gridNum.push([Infinity])
        this.gridColor.push([0])
        while( x < this.xMax){
          this.gridNum[y][x] = Infinity;
          this.gridColor[y][x] = 'w'
          x += 1;
        }
        y += 1; 
        }

        

        
        

    }

    outputGrid(){

      
      
      

      for(let i = 0; i < this.yMax; i++){
        for(let j = 0; j < this.xMax; j++){
          
          if(this.gridColor[i][j] == 'w'){
            fill(255,255,255);
          }else if(this.gridColor[i][j] == 'b'){
            fill(0,0,255);
          }else if(this.gridColor[i][j] == 'r'){
            fill(255,0,0);
          }else if(this.gridColor[i][j] == 'k'){
            fill(50,50,50);
          }else if(this.gridColor[i][j] == 'g'){
            fill(0,255,0);
          }else{
            fill(125,0,255);
          }
            
          

          square(j*this.size, i*this.size + this.yShift, this.size);
        }
        
      }

      

    }

    setColorGrid(x, y, charColor){

      this.gridColor[y][x] = charColor;

    }

    spreadColor(start, end){

      for(let i = 0; i < this.gridColor.length; i++){
        for(let j = 0; j < this.gridColor[0].length; j++){
          if(this.gridColor[i][j] != 'k'){
            this.gridColor[i][j] = 'w';
          }
          this.gridNum[i][j] = Infinity;
        }
      }

      let targetPos = [...start.returnPos()];

      this.gridNum[targetPos[1]][targetPos[0]] = 0;

      let rowNum = this.gridNum.length;
      let colNum = this.gridNum[0].length;

      let endTargetPos = [...end.returnPos()];


      let num = 0;

      while(num < this.xMax * this.yMax){

      for(let i = 0; i < this.gridNum.length - 1; i++){
        for(let j = 0; j < this.gridNum[0].length; j++){
          if(this.gridNum[i][j] == num){
            if(endTargetPos[0] == j && endTargetPos[1] == i){
              return [j,i];
            }

            if(j < this.gridNum[0].length-1){
              if(this.gridNum[i][j+1] > num && this.gridColor[i][j+1] != 'k'){
                this.gridNum[i][j+1] = num + 1;
                this.gridColor[i][j+1] = 'b';
              }
            }

            if(i > 0){
              if(this.gridNum[i-1][j] > num && this.gridColor[i-1][j] != 'k'){
                this.gridNum[i-1][j] = num + 1;
                this.gridColor[i-1][j] = 'b';
              }
            }

            if(i < this.gridNum.length - 1){
              if(this.gridNum[i+1][j] > num && this.gridColor[i+1][j] != 'k'){
                this.gridNum[i+1][j] = num + 1;
                this.gridColor[i+1][j] = 'b';
              }
            }

            if(j > 0){
              if(this.gridNum[i][j-1] > num && this.gridColor[i][j-1] != 'k'){
                this.gridNum[i][j-1] = num + 1;
                this.gridColor[i][j-1] = 'b';
              }
            }

            
            
          }
        }
      }
      num += 1;
    }

    return targetPos;

    }
  
    tracePath(start, end){

      let pos = [...this.spreadColor(start, end)];

      let x = pos[0];
      let y = pos[1];

      let startX = (start.returnPos())[0];
      let startY = (start.returnPos())[1];

      if(x == startX && y == startY){

        textSize(20);
        fill(0,0,0);
        text("No Path Found", 0, 45)

      }else{
        let num = this.gridNum[pos[1]][pos[0]];
      
        let count = 0;

        while(num >= 0){

          let nextNum = num - 1;
          let x = pos[0];
          let y = pos[1];

          this.gridColor[y][x] = 'r';

          if(x < this.gridNum[0].length - 1){
            if(this.gridNum[y][x+1] == nextNum){
              pos = [x+1, y];
            }
          }
        
          if(x > 0){
            if(this.gridNum[y][x-1] == nextNum){
              pos = [x-1,y];
            }
          }
        
          if(y < this.gridNum.length - 1){
            if(this.gridNum[y+1][x] == nextNum){
              pos = [x, y+1];
            }
          }
        

          if(y > 0){
            if(this.gridNum[y-1][x] == nextNum){
              pos = [x,y-1];
            }
  
          }
        
          num = nextNum;
          count++;

        }

        return true;
      }

      

    }
    
};