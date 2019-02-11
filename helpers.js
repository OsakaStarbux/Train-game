 /*jshint esversion: 6 */

// takes a vector point and a curve direction: LEFT, RIGHT, STRAIGHT
// produces a BezierCurve of that type
function calcCurveFromPoint(pointVector, direction) {

  let curve;
  let a = pointVector;
  let b;
  let c;
  let d;
  let b_offset;
  let c_offset;
  let d_offset;

  switch (direction) {
    case "LEFT":

      b_offset = createVector(250, 0);
      c_offset = createVector(250, -200);
      d_offset = createVector(500, -200);

      break;
    case "RIGHT":

      b_offset = createVector(250, 0);
      c_offset = createVector(250, 200);
      d_offset = createVector(500, 200);

        break;
    case "STRAIGHT":

      b_offset = createVector(0, 0);
      c_offset = createVector(500, 0);
      d_offset = createVector(500, 0);

      }

  b = p5.Vector.add(a, b_offset);
  c = p5.Vector.add(a, c_offset);
  d = p5.Vector.add(a, d_offset);

  curve = new BezierCurve(a, b, c, d);
  return curve;

}

// A function that draws the current frame rate to the canvas
function showFrameRate(){
var fps = frameRate();
  if (fps > highest) {
    highest = fps;
  }

  fill(255);
  noStroke();
  textSize(24);
  text("FPS: " + highest.toFixed(0),10, height - 10);

}

function showTrainPos(){
  fill(255);
  noStroke();
  textSize(24);
  text(`Train pos: x: ${course.train.x.toFixed(0)}, y: ${course.train.y.toFixed(0)}`, 150, height - 10);

}

function showMousePos(){
  fill(255);
  noStroke();
  textSize(24);
  text(`Mouse: x: ${mouseX.toFixed(0)}, y: ${mouseY.toFixed(0)}`, 550, height - 10);

}

function showAdjustedMousePos(){
  fill(255);
  noStroke();
  textSize(24);
  text(`Adjusted Mouse: x: ${adjustX(mouseX).toFixed(0)}, y: ${adjustY(mouseY).toFixed(0)}`, 850, height - 10);

}

function showWidthHeight(){
  fill(255);
  noStroke();
  textSize(24);
  text(`Width: ${width.toFixed(0)}, Height: ${height.toFixed(0)}`, 150, 20);

}


// Consumes an array of points and draws a curve using p5 curveVertex
function curveFromArray(array) {
  noFill();
  beginShape();
  curveVertex(array[0].x, array[0].y);
  for (let point of array) {
    curveVertex(point.x, point.y);
  }
  curveVertex(array[array.length - 1].x, array[array.length - 1].y);

  endShape();
}


// All purpose click detection function
// Consumes rectangle rectangle corner vectors (topleft, bottomright, pointVector)
// returns true if the point is withn the boundary, false if not
function containsPoint(topLeft, bottomRight, point){
  return point.x > topLeft.x &&
          point.x < bottomRight.x &&
          point.y > topLeft.y &&
          point.y < bottomRight.y;

}


// convert window coordinates to canvas coordinates
// TODO: make this work
function adjustX(val){
  return 100 + val - course.train.x / 2;
}

function adjustY(val){
  return (val - course.train.y - height / 2) * 2;
}

// offset functions to place the viewport on the canvas

function offsetX(val){
  return -val / 2 + width / 4;
}

function offsetY(val){
  return -val / 2 + height / 2;
}
