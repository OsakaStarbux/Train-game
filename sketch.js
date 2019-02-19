 /*jshint esversion: 6 */
//global variables
let cnv;
let track;

// colors
let sand;
let grass;
let sea;
let stationColor;
let trackbedColor;

let speed = 1; // Naturals only
let course;
let courseTree;

function setup() {

  cnv = createCanvas(1200, 400);
  cnv.mouseClicked(handleClick);
  background(200);
  //let s1 = createVector(width / 4, height / 2);
  courseTree = buildTree();

  course = new Course(courseTree);

  // colors
  sand = color("#ffd98e");
  grass = color("#97de95");
  sea = color("#6bd5e1");
  stationColor = color("wheat");
  trackbedColor = color("tan");

}

function draw() {
  background(grass);
  // show framerate for debugging
  //  frameRate();
  // show camera position for debugging
//  showTrainPos();
  // show mouse position for debugging
//  showMousePos();

//  showAdjustedMousePos();

//  showWidthHeight();
  // divide the value by 2 to compensate for scaling in the draw functions
  // add some fraction of the screen width and height to the x and y
  // to position them on the screen
  translate(offsetX(course.train.x),offsetY(course.train.y));
  // course update and show
  course.update();

}

function handleClick(){

  course.currentState.handleClick(course.courseTree);

}
