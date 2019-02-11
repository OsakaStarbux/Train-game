
function Signal(node, pos) {
  this.node = node;
  this.pos = pos;
  this.bounds = {
    min:{ x: this.pos.x - 90, y: this.pos.y - 170},
    max:{ x: this.pos.x + 15, y: this.pos.y + 155}
  };

  this.rotation = 0;
  this.green = color(0, 255, 0);
  this.darkgreen = color(0, 100, 0);
  this.red = color(255, 0, 0);
  this.darkred = color(100, 0, 0);
  this.armColor = color(220, 0, 0);
  this.greenSpectacleColor = this.green;
  this.redSpectacleColor = this.darkred;

  this.toggle = function(){
    if (this.node.isOpen){
      this.node.isOpen = false;
    } else {
      this.node.isOpen = true;
    }
  };

  this.contains = function(point){
    if (point.x > this.bounds.min.x &&
      point.x < this.bounds.max.x &&
      point.y > this.bounds.min.y &&
      point.y < this.bounds.max.y){
        return true;
      } else {
        return false;
      }
    };

  this.show = function() {




    // draw post
    push();

    scale(0.5); // scales whole signal
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(pos.x, pos.y, 12, 300, 20, 20, 0, 0);

// use the signal's parent node' isOpen Boolean to draw open or closed
    if (this.node.isOpen) {
      this.rotation = PI / 4;
      this.greenSpectacleColor = this.green;
      this.redSpectacleColor = this.darkred;
    } else {
      this.rotation = 0;
      this.greenSpectacleColor = this.darkgreen;
      this.redSpectacleColor = this.red;
    }


    translate(pos.x, pos.y - 100);
    rotate(this.rotation);
    noStroke();
    // arm
    fill(this.armColor);
    rect(-55, 10, 100, 20,3,3,3,3 );
    // arm stripe
    fill(255);
    rect(-85, 10, 10, 20);
    //spectacle frame and pivot mount
    fill(0);

    push();
    translate(0, 0);
    rotate(PI / 4);
    rect(5, 5, 20, 20, 5, 5, 5, 5);
    pop();

    rect(0, 10, 35, 20, 0, 20, 20, 0);
    // red spectacle
    fill(this.redSpectacleColor);
    rect(-3, 10, 14, 10, 5, 5, 5, 5);
    // green spectacle
    fill(this.greenSpectacleColor);
    ellipseMode(CENTER);
    ellipse(9, 12, 12, 12);
    pop();
  };


}
