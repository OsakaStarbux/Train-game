 /*jshint esversion: 6 */

class Tree {
  constructor(){
      this.root = null;
  }

  draw() {
    this.root.draw();
  }

  checkTreeClicked() {
    this.root.checkNodeClicked();
  }

  getNextNode() {
    this.root.getNextNode();
  }
}

class Node {
  constructor(val, direction, name){
    this.name = name;
    this.parent = null;
    this.value = val; // val is a vector
    this.trackSection = new TrackSection(val, direction);
    this.signal = null;
    this.hasSignal = false;
    this.left = null;
    this.right = null;
    this.isGoal = false;
    this.isOpen = true;
    this.isLeaf = false;
    this.nextNode = null;
  }

  draw() {
    if (this.left != null) {
      this.left.draw();
    }

    this.drawNode();

    if (this.parent !== null) {
      //do something with the parent
      if (this.parent.left !== null && this.parent.right !== null){
        // this node is one of two brnaches and needs a signal
        this.hasSignal = true;
        let leftBranchPos = createVector(this.value.x, this.value.y - 200);
        let rightBranchPos = createVector(this.value.x, this.value.y + 200);
        if (this.parent.left === this){
          // this is a left branch
          this.signal = new Signal(this,leftBranchPos);
        } else {
          this.signal = new Signal(this,rightBranchPos);
        }
      }
    }

    if (this.left === null && this.right === null) {
      this.isLeaf = true;
    }

    if (this.right != null) {
      this.right.draw();
    }
  }

  getNextNode() {
    if (this.left != null) {
      this.left.getNextNode();
    }

    if (this === course.currentNode) {
      // this is the current node of the course
      if (this.left != null && this.left.isOpen === true) {
        this.nextNode = this.left;
      }

      if (this.right != null && this.right.isOpen === true) {
        this.nextNode = this.right;
      }
    }

    if (this.right != null) {
      this.right.getNextNode();
    }
  }

  checkNodeClicked() {

    // if left node exists call recursively
    if (this.left != null) {
      this.left.checkNodeClicked();
    }
  // adjust the click position for the camera translation

    let adjustedClickPosition = createVector(adjustX(mouseX), adjustY(mouseY));

    // do something to the current node
    if (this.hasSignal){
      if (this.signal.contains(adjustedClickPosition)) {

        this.clicked();
      }
    }

    // if left node exists call recursively
    if (this.right != null) {
      this.right.checkNodeClicked();
    }

  }

  clicked() {
    this.toggleSwitch();
  }

  showName() {
    let leftBranchPos = createVector(this.value.x, this.value.y - 100);
    let rightBranchPos = createVector(this.value.x, this.value.y + 100);
    let pos;

      if (this.parent !== null){
        if (this.parent.left === this){
        // this is a left branch
          pos = leftBranchPos;
          push();
            scale(0.5);
            textSize(50);
            text(this.name, pos.x, pos.y);
          pop();
        } else {
          pos = rightBranchPos;
          push();
            scale(0.5);
            textSize(50);
            text(this.name, pos.x, pos.y);
          pop();
        }
      } else {
        push();
          scale(0.5);
          textSize(50);
          text(this.name, this.value.x, this.value.y - 100);
        pop();
      }
  }

  drawNode() {
    push();
    noStroke();

    if (this.parent === null){
      // This node is the root node
      this.trackSection.drawRoot();
    }

    if (this.left === null && this.right === null) {
      // draw differently if this is a leaf
      this.trackSection.drawLeaf();

      if (this.isGoal) {
        //draw differently if this is tha goal
      this.trackSection.drawGoal();
      }
    }
    // draw the node's track section
    this.trackSection.draw();
    // draw the node's signal
    if (this.hasSignal){
      this.signal.show();
    }
    // Show the name above the track section for debugging
    //  this.showName();
  }

  addNodeLeft(data, direction, name) {
    let newNode = new Node(data, direction, name);
    newNode.parent = this;
    this.left = newNode;
  }

  addNodeRight(data, direction, name) {
    let newNode = new Node(data, direction, name);
    newNode.parent = this;
    this.right = newNode;
  }

  toggleSwitch() {
    if (!this.hasSignal) {
      return;
    }

    if (this.parent.left.isOpen === true) {
      this.parent.left.isOpen = false;
      this.parent.right.isOpen = true;
    } else {
      this.parent.left.isOpen = true;
      this.parent.right.isOpen = false;
    }
  }

  isLeaf() {
    return this.left === null && this.right === null;
  }
}
