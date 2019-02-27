 /*jshint esversion: 6 */

class Forest {

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.min = {x: this.x - 75, y: this.y - 75};
    this.max = {x: this.x + 50, y: this.y + 50};
    this.trees = [];
    this.color = random(treeColors);

    for (let i = 0; i <= 5; i++){
      let x = random(floor(this.min.x), floor(this.max.x));
      let y = random(floor(this.min.y), floor(this.max.y));
      let newTree = new SceneTree(x, y);
      this.trees.push(newTree);
    }
    this.trees.sort((a, b) => a.y - b.y);

  }

  draw(){
    for (let tree of this.trees){
      tree.draw();
    }
  }
}

class SceneTree{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = random(treeColors);
    this.variety = random(["round","pointy"]);
  }

  draw() {
    if (this.variety == "round"){
    push();
    translate(this.x, this.y);
    fill(this.color);
    ellipse(0, -20, 30, 50);
    //trunk
    fill(woodColor);
    rectMode(CENTER);
    rect(0, 5, 5, 15);
    pop();
    } else if (this.variety == "pointy"){
    push();
    translate(this.x, this.y);
    fill(this.color);
    beginShape();
    //apex
    vertex(0, -65);
    // right top
    vertex(15, -45);
    vertex(5, -45);
    //right middle
    vertex(20, -25);
    vertex(10, -25);
    //right bottom
    vertex(25, -5);
    // left bottom
    vertex(-25, -5);
    // left middle
    vertex(-10, -25);
    vertex(-20, -25);
    // left top
    vertex(-5, -45);
    vertex(-15, -45);
    endShape(CLOSE);
    //trunk
    fill(woodColor);
    rectMode(CENTER);
    rect(0, 0, 5, 15);
    pop();
    }
  }
}


function Pond(x, y){
  this.x = x;
  this.y = y;

  this.draw = function(){
    push();
    translate(this.x, this.y);
    fill(seaColor);
    rectMode(CENTER);
    rect(0, 0, 200, 100, 20, 20, 20, 20);
    rect(100, 50, 100, 50, 20, 20, 20, 20);
    fill(255);
    rect(1,0, 10,5);
    stroke(255);
    strokeWeight(1);
    line(0,0,-6,-5);
    ellipse(-6, -5, 4, 3);
    fill("orange");
    noStroke();
    rect(-10,-4,4,2);
    pop();
  };

}

class Windmill{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }


  draw(){
    push();
    translate(this.x, this.y);
    //dome
    fill(woodColor);
    ellipse(0 ,0, 40, 40);
    //upper building
    beginShape();
    vertex(-20, 0);
    vertex(20, 0);
    vertex(30, 80);
    vertex(-30, 80);
    endShape(CLOSE);
    //lower building
    beginShape();
    vertex(-30, 80);
    vertex(30, 80);
    vertex(25, 100);
    vertex(-25, 100);
    endShape(CLOSE);
    // windows
    fill("black");
    rect(-5, 30, 10, 10);
    rect(-5, 50, 10, 10);
    // walkway
    fill(255);
    rect(-35, 70, 70, 5);
    //small circle
    fill("black");
    ellipse(0 ,0, 10, 10);
    // blades
    fill("#2E1800");
    stroke("#2E1800");
    rotate(HALF_PI / 2);

    strokeWeight(5);
    line(-80, 0, 80, 0);
    rect(10, 0, 70, 20);
    rect(-10, -20, -70, 20);
    rotate(HALF_PI);
    line(-80, 0, 80, 0);
    rect(10, 0, 70, 20);
    rect(-10, -20, -70, 20);
    pop();
  }
}
