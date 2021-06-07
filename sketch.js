//Global variable creation
let grid;
let header;
let start;
let end;
let currTime;
let prevTime;


function setup() {
  createCanvas(windowWidth,windowHeight);

  grid = new Grid();

  header = new Header();

  start = new Target(false);
  end = new Target(true);

  //Set the time variables
  prevTime = 0;
  currTime = 0;

}

function draw() {

  //Print the grid square colors out
  grid.outputGrid();

  //Draw the start target and move it if needed
  start.drawStart();
  start.updatePos(end);

  //Draw the end target and move it if needed
  end.drawEnd();
  end.updatePos(start);

  //Read in the current time
  currTime = millis();

  //Either draw or erase the board

  //Return a time same as current time if the draw/ erase button is pressed
  prevTime = header.drawOrErase(grid, start, end, currTime, prevTime);

  //Trace out the shortest path
  grid.tracePath(start, end);

    
  

}

/*
* If the window is resized, create a new canvas and reset the board
*/
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  grid = new Grid();

  header = new Header();

  start = new Target(false);
  end = new Target(true);

}
