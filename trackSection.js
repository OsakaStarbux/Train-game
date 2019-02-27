 /*jshint esversion: 6 */

// consumes a start point and direction and produces a tracksection
class TrackSection {
  constructor(startPoint, direction){

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
  }

  draw() {
    // draw sleepers

    for (let i = 0; i < this.sleeperPoints.length; i++) {
      push();
      scale(0.5);
      translate(this.sleeperPoints[i].x, this.sleeperPoints[i].y);
      rotate(this.sleeperTangents[i]);
      fill(sleeperColor);
      noStroke();
      rectMode(CENTER);
      rect(0, 0, 5, 50);
      pop();
    }
    // draw rails
    push();
    scale(0.5);
    stroke(railColor);
    strokeWeight(5);
    strokeCap(PROJECT);
    curveFromArray(this.offsetPointsL);
    curveFromArray(this.offsetPointsR);
    pop();

  }

  drawLeaf() {

    push();
    scale(0.5);


    translate(this.endPoint.x, this.endPoint.y);
    fill(sleeperColor);
    noStroke();
    rectMode(CENTER);
    rect(70, 0, 5, 50);
    rect(35, 0, 5, 50);
    rect(0, 0, 5, 50);
    // rails
    stroke(railColor);
    strokeWeight(5);
    line(-100, -15, 100, -15);
    line(-100,  15, 100,  15);
    noStroke();
    rectMode(CENTER);
    fill(255,0,0);
    rect(100, 0, 10, 50);
    stroke(255);
    strokeWeight(5);
    noFill();
    rect(135, 0, 50, 30);
    pop();
  }

    drawRoot() {
      // draw root
      push();
      scale(0.5);

      translate(this.startPoint.x, this.startPoint.y);
      rectMode(CENTER);
      // station building
      // roof
      fill(71);
      rect(0, -155, 200, 50);

      // wall
      push();
      fill(stationColor);
      rect(0, -90, 200, 80);
      stroke("green");
      strokeWeight(5);
      line(-100, -110, 100, -110);
      line(-100, -70, 100, -70);
      line(-100, -50, 100, -50);
      fill("white");
      //sign circle
      ellipse(60,-90,25,25);
      // name plate
      fill("green");
      rect(60, -90, 50,5);
      pop();
      // door
      fill("green");
      rect(-50, -80, 30, 55);
      fill("black");
      rect(-50, -75, 20, 50);
      // window
      fill("green");
      rect(0, -90, 40, 40);
      fill("black");
      rect(0, -90, 30, 30);
      //triangles

      fill(255);
      triangleStrip(-100, -130, 20, 20, 100);

      //platform
      fill(121);
      rect(0, -35, 200, 20);
      fill(201);
      rect(0, -30, 200, 5);
      // trackbed
      fill(trackbedColor);
      rect(0, 0, 200, 55);
      // sleepers
      fill(sleeperColor);
      noStroke();
      rectMode(CENTER);
      rect(-70, 0, 5, 50);
      rect(-35, 0, 5, 50);
      rect(0, 0, 5, 50);

      // rails
      stroke(railColor);
      strokeWeight(5);
      line(-100, -15, 100, -15);
      line(-100,  15, 100,  15);
      pop();
    }

    drawGoal() {
      // draw root
      push();
      scale(0.5);

      translate(this.endPoint.x, this.endPoint.y);
      rectMode(CENTER);
      // station building
      // roof
      fill(71);
      rect(0, -155, 200, 50);

      // wall
      push();
      fill(stationColor);
      rect(0, -90, 200, 80);
      stroke("green");
      strokeWeight(5);
      line(-100, -110, 100, -110);
      line(-100, -70, 100, -70);
      line(-100, -50, 100, -50);
      fill("white");
      //sign circle
      ellipse(60,-90,25,25);
      // name plate
      fill("green");
      rect(60, -90, 50,5);
      pop();
      // door
      fill("green");
      rect(-50, -80, 30, 55);
      fill("black");
      rect(-50, -75, 20, 50);
      // window
      fill("green");
      rect(0, -90, 40, 40);
      fill("black");
      rect(0, -90, 30, 30);
      //triangles
      fill(255);
      triangleStrip(-100, -130, 20, 20, 100);

      //platform
      fill(121);
      rect(0, -35, 200, 20);
      fill(201);
      rect(0, -30, 200, 5);
      // trackbed
      fill(trackbedColor);
      rect(0, 0, 200, 55);
      // sleepers
      fill(sleeperColor);
      noStroke();
      rectMode(CENTER);
      rect(70, 0, 5, 50);
      rect(35, 0, 5, 50);
      rect(0, 0, 5, 50);
      // rails
      stroke(railColor);
      strokeWeight(5);
      line(-100, -15, 100, -15);
      line(-100,  15, 100,  15);


      pop();
    }
}
