//global variables
let scaleSize;
let bcurve;
let train;
let track;
let noiseVal;
let noiseScale;
let sand;
let grass;
let sea;
let frameH;
let highest = 0.0;
let speed = 1; // Naturals only
let course;
let tracks = [];


function setup() {
  
  createCanvas(640, 480);
  background(200);
  let s1 = createVector(50, 300);
  curve1 = calcCurveFromPoint(s1, "RIGHT"); 

  let s2 = createVector(550, 500);
  curve2 = calcCurveFromPoint(s2, "STRAIGHT"); 

  let s3 = createVector(1050, 500);
  curve3 = calcCurveFromPoint(s3, "LEFT"); 
  
  // create the tracks from the bezier curves
  track1 = new TrackSection(curve1);
  track2 = new TrackSection(curve2);
  track3 = new TrackSection(curve3);
  tracks = [track1, track2, track3];
  // create the course from the tracks
  course = new Course(tracks)

  frameH = 250;
  scaleSize = 0.5;
  sand = color("#ffd98e");
  grass = color("#97de95");
  sea = color("#6bd5e1");
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