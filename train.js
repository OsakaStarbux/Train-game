/*
  TODO: pass in a config or options object to draw a different
  kind / color train. There should be default options and the
  constructor should iterate over it checking for typeof
  undefined and set values for those passed in. An empty object
  should be assigned to options for when no option object is
  passed.
*/
// a train constructor function
function Train(trackSection) {
  
  this.length = 100;
  this.width = 40;
  this.angle = 0;
  this.currentTrackSection = trackSection;
  this.posAngles = this.currentTrackSection.posAngles;
  this.x = this.posAngles[0].x;
	this.y = this.posAngles[0].y;
  this.currentPos = 1; // skip the first pos to stop repeats
  this.camera = createVector(-this.x + width / 4, -this.y + height);
  this.hasFinishedCurrentSection = false 

  this.update = function(speed) {
       
    if (this.currentPos <= this.posAngles.length - 1){
      // track section not complete
      this.x = this.posAngles[this.currentPos].x;
      this.y = this.posAngles[this.currentPos].y;
      this.angle = this.posAngles[this.currentPos].a;
      this.currentPos += speed;
      this.camera = createVector(-this.x + width / 4, -this.y + height);
     } else { 
       // track section is complete
       this.hasFinishedCurrentSection = true; 
     }
  };

  this.show = function() {
    
    push();
    strokeWeight(1);
    stroke("red");
    fill(200);
    translate(this.x, this.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.length, this.width);
    fill(color("#429EE9"));
    // flanks
    rect(this.length * 0.01, 0, this.length * 0.75, this.width * 0.75);
    // boiler
    stroke(0);
    rect(this.length * 0.01, 0, this.length * 0.75, this.width * 0.5);
    fill(0);
    noStroke();
    //cab roof
    rect(-this.length * 0.3, 0, this.length * 0.35, this.width * 1.15);
    //tender
    fill(50);
    stroke(0);
    strokeWeight(2);
    rect(-this.length * 0.55, 0, this.length * 0.15, this.width);
    fill(0);
    stroke(0);
    strokeWeight(2);
    //front of boiler
    rect(this.length * 0.4, 0, this.length * 0.14, this.width * 0.5);
    stroke(200);
    strokeWeight(2);
    ellipse(this.length * 0.4, 0, 7, 7);
    //headlamp
    fill(255);
    noStroke();
    ellipse(this.length * 0.45, this.width * 0.4, 7, 7);

    // front buffer
    fill("red");
    noStroke();
    rect(
      this.length * 0.52,
      this.width * 0.3,
      this.width * 0.1,
      this.width * 0.1
    );
    rect(
      this.length * 0.52,
      -this.width * 0.3,
      this.width * 0.1,
      this.width * 0.1
    );
    fill(0);
    noStroke();
    rect(
      this.length * 0.55,
      this.width * 0.3,
      this.width * 0.1,
      this.width * 0.25
    );
    rect(
      this.length * 0.55,
      -this.width * 0.3,
      this.width * 0.1,
      this.width * 0.25
    );
    rect(this.length * 0.55, 0, this.width * 0.2, this.width * 0.1);

    //back buffer
    fill("red");
    noStroke();
    rect(
      -this.length * 0.65,
      this.width * 0.3,
      this.width * 0.1,
      this.width * 0.1
    );
    rect(
      -this.length * 0.65,
      -this.width * 0.3,
      this.width * 0.1,
      this.width * 0.1
    );
    fill(0);
    noStroke();
    rect(
      -this.length * 0.7,
      this.width * 0.3,
      this.width * 0.1,
      this.width * 0.25
    );
    rect(
      -this.length * 0.7,
      -this.width * 0.3,
      this.width * 0.1,
      this.width * 0.25
    );
    rect(this.length * 0.55, 0, this.width * 0.2, this.width * 0.1);
    // whistle
    fill("yellow");
    noStroke();

    ellipse(
      -this.length * 0.1,
      this.width * 0.05,
      this.width * 0.1,
      this.width * 0.1
    );
    ellipse(
      -this.length * 0.1,
      -this.width * 0.05,
      this.width * 0.1,
      this.width * 0.1
    );
    // red lines
    stroke("red");
    strokeWeight(2);

    line(0, -this.width * 0.22, 0, this.width * 0.22);

    line(
      this.length * 0.1,
      -this.width * 0.22,
      this.length * 0.1,
      this.width * 0.22
    );

    line(
      this.length * 0.2,
      -this.width * 0.22,
      this.length * 0.2,
      this.width * 0.22
    );

    line(
      this.length * 0.3,
      -this.width * 0.22,
      this.length * 0.3,
      this.width * 0.22
    );

    // bell
    stroke(color("#1486e2"));
    strokeWeight(1);
    fill(color("#429EE9"));
    ellipse(this.length * 0.2, 0, this.width * 0.22, this.width * 0.22);

    pop();
  };
}