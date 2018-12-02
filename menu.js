
// a menu constructor function
function Menu() {

  this.update = function() {

  };

  this.show = function() {

    push();
    fill(0,0,0,200);

    translate(-course.train.camera.x + 500, -course.train.camera.y + 500);
    ellipse(0, 0, 200, 200);
    stroke(255, 255, 255, 0.5);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("START", 0, 0);
    pop();
  }

}
