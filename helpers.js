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
      c_offset = createVector(500, 0)
      d_offset = createVector(500, 0)
        
      }
  
  b = p5.Vector.add(a, b_offset);
  c = p5.Vector.add(a, c_offset);
  d = p5.Vector.add(a, d_offset);
   
  curve = new BezierCurve(a, b, c, d);
  return curve
  
}





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

function showCameraPos(x, y){
var fps = frameRate();
  if (fps > highest) {
    highest = fps;
  }
  
  fill(255);
  noStroke();
  textSize(24);
  text("Camera: x: " + x.toFixed(0) + ", y: " + y.toFixed(0), 150, height - 10)
	
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