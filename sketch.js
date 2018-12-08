
//global variables
let cnv;
let track;
let sand;
let grass;
let sea;
let speed = 1; // Naturals only
let course;
let tracks = [];

function setup() {

  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(handleClick);
  background(200);
  let s1 = createVector(width / 4, height / 2);
  tracks  = buildCourse(s1, ["RIGHT",
                             "STRAIGHT",
                             "LEFT",
                             "STRAIGHT",
                             "LEFT",
                             "STRAIGHT",
                             "RIGHT",
                             "RIGHT",
                             "STRAIGHT"
                            ]);
  course = new Course(tracks)

  // colors
  sand = color("#ffd98e");
  grass = color("#97de95");
  sea = color("#6bd5e1");
  
}

function draw() {
  background(grass)
  // show framerate for debugging
  //  showFrameRate();
  // show camera position for debugging
  //showCameraPos(course.train.x, course.train.y);

  // dived the value by 2 to compensate for scaling in the draw functions
  // add some fraction of the screen width and height to the x and y
  // to position them on the screen
  translate(-course.train.x / 2 + width / 4, -course.train.y /2 + height / 2);
  // course update and show
  course.update();

}

function handleClick(){
  course.currentState.handleClick();
}
