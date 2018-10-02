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
};