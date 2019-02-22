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

  cnv = createCanvas(1200, 400);
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
  // create windmill for the scene
  let windmill = new Windmill(550, -20);
  sceneItems.push(windmill);
  // create pond for the scene
  let pond = new Pond(-180, 100);
  sceneItems.push(pond);



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
