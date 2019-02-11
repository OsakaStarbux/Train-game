 /*jshint esversion: 6 */
// a track section constructor function
// consumes a start point and direction and produces a tracksection
function TrackSection(startPoint, direction) {

  this.curve = calcCurveFromPoint(startPoint, direction) ;
  this.sleeperCount = 15;
  this.offsetpointCount = 15;
  this.offsetDistance = 15; // half of the guage
  this.stepPointCount = 100;
  this.sleeperPoints = this.curve.equidistantPoints(this.sleeperCount);
  // offsetPoints params howMany, dist, angle
  this.offsetPointsL = this.curve.offsetPoints(
    this.offsetpointCount,
    this.offsetDistance,
    HALF_PI
  );
  this.offsetPointsR = this.curve.offsetPoints(
    this.offsetpointCount,
    this.offsetDistance,
    HALF_PI + PI
  );
  this.sleeperTangents = this.curve.tangentPoints(this.sleeperCount);
  this.stepPoints = this.curve.equidistantPoints(this.stepPointCount);
  this.startPoint = startPoint;
  this.endPoint = this.stepPoints[this.stepPoints.length -1];
  this.stepTangents = this.curve.tangentPoints(this.stepPointCount);
  this.posAngles = [];

  for (let [index, point] of this.stepPoints.entries()) {
    this.posAngles.push({
      x: point.x,
      y: point.y,
      a: this.stepTangents[index]
    });
  }

  this.draw = function() {
    // draw sleepers

    for (let i = 0; i < this.sleeperPoints.length; i++) {
      push();
      scale(0.5);
      translate(this.sleeperPoints[i].x, this.sleeperPoints[i].y);
      rotate(this.sleeperTangents[i]);
      fill(81, 68, 63);

      noStroke();
      rectMode(CENTER);
      rect(0, 0, 5, 50);
      pop();
    }
    // draw rails
    push();
    scale(0.5);
    stroke(242, 252, 255);
    strokeWeight(5);
    strokeCap(PROJECT);
    curveFromArray(this.offsetPointsL);
    curveFromArray(this.offsetPointsR);
    pop();

  };

  this.drawLeaf = function() {

    push();
    scale(0.5);
    fill(255,0,0);
    translate(this.endPoint.x, this.endPoint.y);
    rectMode(CENTER);
    rect(100, 0, 10, 50);
    stroke(255);
    strokeWeight(5);
    noFill();
    rect(135, 0, 50, 30);
    pop();
  };


    this.drawGoal = function() {
      // draw signal
      push();
      scale(0.5);

      translate(this.endPoint.x, this.endPoint.y);
      rectMode(CENTER);
      fill("brown");
      rect(0, -50, 200, 100);
      fill(81);
      rect(0, 0, 200, 100);

      pop();
    };
}
