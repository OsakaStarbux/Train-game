 /*jshint esversion: 6 */

function Forest(x, y) {
  this.x = x;
  this.y = y;
  this.min = {x: this.x - 50, y: this.y - 50};
  this.max = {x: this.x + 50, y: this.y + 50};
  this.trees = [];
  this.init = function(){
    // populate trees
    for (i = 0; i <= 10; i++){
      let x = random(floor(this.min.x), floor(this.max.x));
      let y = random(floor(this.min.y), floor(this.max.y));
      let newTree = new SceneTree(x, y);
      this.trees.push(newTree);
    }
    this.trees.sort((a, b) => a.y - b.y);
  };

  this.color = random(treeColors);

  this.draw = function(){
    for (let tree of this.trees){
      tree.draw();
    }
  };
  this.init();

}

function SceneTree(x, y){
  this.x = x;
  this.y = y;
  this.color = random(treeColors);
  this.variety = random(["round","pointy"]);

  this.draw = function(){
    if (this.variety == "round"){
    push();
    translate(this.x, this.y);
    fill(this.color);
    ellipse(0, -20, 30, 50);
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

      fill(woodColor);
      rectMode(CENTER);
      rect(0, 0, 5, 15);
      pop();
  }
  };

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
    pop();
  };

}

function Windmill(x, y){
  this.x = x;
  this.y = y;

  this.draw = function(){
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
  };

}
