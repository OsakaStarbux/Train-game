



//global variables
let cnv;
let scaleSize;
let bcurve;
let train;
let track;
let noiseVal;
let noiseScale;
let menu;
let sand;
let grass;
let sea;
let frameH;
let highest = 0.0;
let speed = 1; // Naturals only
let course;
let tracks = [];

function setup() {
console.log("p5 setup")
  cnv = createCanvas(640, 480);
  background(200);
  let s1 = createVector(50, 300);
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

  frameH = 250;
  scaleSize = 0.5;
  sand = color("#ffd98e");
  grass = color("#97de95");
  sea = color("#6bd5e1");
  menu = new Menu();

  //background(sea);
}

function draw() {
  background(grass)
  // show framerate for debugging
  showFrameRate();
  // show camera position for debugging
  showCameraPos(course.train.camera.x, course.train.camera.y);
  scale(scaleSize);

  translate(course.train.camera.x, course.train.camera.y);

  // train update and show
  course.update();
  
}
