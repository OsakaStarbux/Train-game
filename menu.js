
// a menu constructor function
function Menu() {

  this.update = function() {

  };

  this.show = function() {
    push();
    fill(0,0,0, 0.5)
    rectMode(CENTER);
    rect(width/2, height/2, 100, 100);
    stroke(255, 255, 255, 0.5);
    text("START", width/ 2, height/2);
    pop();
  }

}
