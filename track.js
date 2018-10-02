// a track section constructor function
function TrackSection(bcurve) {
  this.curve = bcurve;
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
  this.stepTangents = this.curve.tangentPoints(this.stepPointCount);
  this.posAngles = [];

  for (let [index, point] of this.stepPoints.entries()) {
    this.posAngles.push({
      x: point.x,
      y: point.y,
      a: this.stepTangents[index]
    });
  }

  this.show = function() {
    // draw sleepers
    for (let i = 0; i < this.sleeperPoints.length; i++) {
      push();
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
    stroke(242, 252, 255);
    strokeWeight(5);
    strokeCap(PROJECT);
    curveFromArray(this.offsetPointsL);
    curveFromArray(this.offsetPointsR);
    pop();
  };
}