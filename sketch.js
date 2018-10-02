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

function setup() {
  createCanvas(640, 480);
  background(200);
  let a = createVector(50, 300);
  let b = createVector(300, 300);
  let c = createVector(300, 500);
  let d = createVector(550, 490);

  // create the bezier curve
  bcurve = new BezierCurve(a, b, c, d);
  // create the track from the bezier curve
  track = new TrackSection(bcurve);
  // create a train
  train = new Train(track);

  frameH = 250;
  scaleSize = 0.5;
  sand = color("#ffd98e");
  grass = color("#97de95");
  sea = color("#6bd5e1");
  background(sea);
  // draw terrain once in setup rather than every frame
  drawTerrain(width, height, frameH, scaleSize, sand, grass);
}

function draw() {
  scale(scaleSize);

  //reset frame
  noStroke();
  fill(grass);
  rect(0, frameH, width / scaleSize, height / scaleSize);

  // draw track
  track.show();
  // train update and show
  train.update();
  train.show();

  // show framerate for debugging 
  var fps = frameRate();
  if (fps > highest) {
    highest = fps;
  }
  fill(255);
  noStroke();
  textSize(32);
  text("FPS: " + highest.toFixed(0), 100, height / scaleSize );
}

