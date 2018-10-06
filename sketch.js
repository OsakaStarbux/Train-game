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
  let a = createVector(50, 300);
  let b = createVector(300, 300);
  let c = createVector(300, 500);
  let d = createVector(550, 500);

  let e = createVector(550, 500);
  let f = createVector(550, 500);
  let g = createVector(1050, 500);
  let h = createVector(1050, 500);

  let l = createVector(1050, 500);
  let m = createVector(1350, 500);
  let n = createVector(1250, 700);
  let o = createVector(1550, 700);

  // create the bezier curves
  curve1 = new BezierCurve(a, b, c, d);
  curve2 = new BezierCurve(e, f, g, h);
  curve3 = new BezierCurve(l, m, n, o);
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