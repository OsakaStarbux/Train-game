
// a menu constructor function
function Menu() {

  this.x = width / 2;
  this.y = height / 2;

  this.bounds = {
    min:{ x: this.x - width / 4, y: this.y - height / 4},
    max:{ x: this.x + width / 4, y: this.y + height / 4}
  }

  this.menuColor = color(0,0,0,200);

  this.contains = function(point){
   return point.x > this.bounds.min.x && point.x  < this.bounds.max.x &&
     point.y > this.bounds.min.y && point.y < this.bounds.max.y
   }

  this.update = function() {
    let mousePos = createVector(mouseX, mouseY);
    if (this.contains(mousePos)){

      this.menuColor = color(0,0,0,150);
    } else {
      this.menuColor = color(0,0,0,50);
    }
  };

  this.show = function() {

    push();
    resetMatrix()
    fill(this.menuColor);
    rectMode(CORNERS)
    rect(this.bounds.min.x, this.bounds.min.y, this.bounds.max.x, this.bounds.max.y, 2, 2, 2, 2);
    stroke(255, 255, 255);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("START", this.x, this.y);
    pop();

  }

}
