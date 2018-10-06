function showFrameRate(){
var fps = frameRate();
  if (fps > highest) {
    highest = fps;
  }
  
  fill(255);
  noStroke();
  textSize(32);
  text("FPS: " + highest.toFixed(0),10, height - 10);
	
}

function showCameraPos(x, y){
var fps = frameRate();
  if (fps > highest) {
    highest = fps;
  }
  
  fill(255);
  noStroke();
  textSize(32);
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