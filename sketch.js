 /*jshint esversion: 6 */
//global variables
let cnv;
let track;

// colors
let sand;
let grass;
let seaColor;
let stationColor;
let trackbedColor;
let woodColor;
let railColor;
let sleeperColor;
let treeColors = [];
let sceneItems = [];
let forest;


let speed = 1; // Naturals only
let course;
let courseTree;
let resultMsg;

function setup() {

  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(handleClick);
  background(200);

  courseTree = buildTreeB();

  course = new Course(courseTree);
  resultMsg = "";
  // colors
  sand = color("#ffd98e");
  grass = color("#97de95");
  seaColor = color("#6bd5e1");
  stationColor = color("wheat");
  trackbedColor = color("tan");
  woodColor = color("#866538");
  railColor = color(242, 252, 255);
  sleeperColor = color(81, 68, 63);
  treeColors = ["olivedrab","green","yellowgreen","forestgreen", "greenyellow", "darkgreen","lawngreen"];
  // create array of trees for the scene
  forest = new Forest(-150, -100);
  sceneItems.push(forest);
  forest2 = new Forest(550, -200);
  sceneItems.push(forest2);
  forest3 = new Forest(1550, -300);
  sceneItems.push(forest3);
  forest4 = new Forest(2000, 300);
  sceneItems.push(forest4);
  // create windmill for the scene
  let windmill = new Windmill(550, -20);
  sceneItems.push(windmill);
  let windmill2 = new Windmill(2000, -300);
  sceneItems.push(windmill2);
  // create pond for the scene
  let pond = new Pond(-180, 100);
  sceneItems.push(pond);
  let pond2 = new Pond(1000, -300);
  sceneItems.push(pond2);
  let pond3 = new Pond(2000, 0);
  sceneItems.push(pond3);


}

function draw() {
  background(grass);

  //showDebugInfo();

  // divide the value by 2 to compensate for scaling in the draw functions
  // add some fraction of the screen width and height to the x and y
  // to position them on the screen
  translate(offsetX(course.train.x), offsetY(course.train.y));
  // course update and show
  course.update();

  updateScenery();

}

function handleClick(){

  course.currentState.handleClick(course.courseTree);

}

function setupGame(){
  courseTree = buildTreeB();
  course = new Course(courseTree);
}

function updateScenery(){
  for (let item of sceneItems){
    item.draw();
  }
}
function setResult() {
  if (course.currentNode.isGoal){
    resultMsg = "Good work! You arrived at your destination!";
  } else {
    resultMsg = "Oops! You are stuck on a siding!";
  }
}
