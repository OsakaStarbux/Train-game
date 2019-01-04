 /*jshint esversion: 6 */


function Tree() {
  this.root = null;
}

Tree.prototype.draw = function() {
  this.root.draw();
};

Tree.prototype.toggleAll = function() {
  this.root.toggleAll();
};

Tree.prototype.checkTreeClicked = function() {
  this.root.checkNodeClicked();
};

Tree.prototype.getNextNode = function() {
  this.root.getNextNode();
};

function Node(val, direction) {
  this.parent = null;
  this.value = val;
  this.trackSection = new TrackSection(val, direction);
  this.signal = null;
  this.left = null;
  this.right = null;
  this.isGoal = false;
  this.isOpen = true;
  this.isLeaf = false;
  this.nextNode = null;
}

Node.prototype.draw = function() {
  if (this.left != null) {
    this.left.draw();
  }

  this.drawNode();

  if (this.parent !== null) {
    //do something with the parent
    if (this.parent.left !== null && this.parent.right !== null){
      // this node is one of two brnaches and needs a signal

    }
  }

  if (this.left === null && this.right === null) {
    this.isLeaf = true;
  }

  if (this.right != null) {
    this.right.draw();
  }
};

Node.prototype.getNextNode = function() {
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
};

Node.prototype.checkNodeClicked = function() {
  // if left node exists call recursively
  if (this.left != null) {
    this.left.checkNodeClicked();
  }


  let nodePosition = createVector(this.value.x, this.value.y);
  let clickPosition = createVector(mouseX, mouseY);
  // do something to the current node
  if (nodePosition.dist(clickPosition) < 10) {
    this.clicked();
  }

  // if left node exists call recursively
  if (this.right != null) {
    this.right.checkNodeClicked();
  }
};

Node.prototype.toggleAll = function() {
  // if left node exists call recursively
  if (this.left != null) {
    this.left.toggleAll();
  }


  let nodePosition = createVector(this.value.x, this.value.y);
  let clickPosition = createVector(mouseX, mouseY);
  // do something to the current node
  this.toggleSwitch();

  // if left node exists call recursively
  if (this.right != null) {
    this.right.toggleAll();
  }
};

Node.prototype.clicked = function() {

  this.toggleSwitch();
};

Node.prototype.drawNode = function() {
  push();
  noStroke();
  if (this.left === null && this.right === null) {
    // draw differently if this is a leaf
    this.trackSection.drawLeaf();

    if (this.isGoal) {
      //draw differently if this is tha goal
    this.trackSection.drawGoal();
    }
  } else {
    // draw the default node with these options
  }
  // draw the node's track section
  this.trackSection.draw();
// draw the nodes signal

};

Node.prototype.signal = function() {
  if (this.isOpen === true) {
    // draw differently if the node is open
  } else {
    // draw differently if the node is closed
  }
};

Node.prototype.addNodeLeft = function(data, direction) {
  let newNode = new Node(data, direction);
  newNode.parent = this;
  this.left = newNode;
};

Node.prototype.addNodeRight = function(data, direction) {
  let newNode = new Node(data, direction);
  newNode.parent = this;
  this.right = newNode;
};

Node.prototype.toggleSwitch = function() {
  if (this.left === null || this.right === null || this.isGoal === true) {
    return;
  }

  if (this.left.isOpen === true) {
    this.left.isOpen = false;
    this.right.isOpen = true;
  } else {
    this.left.isOpen = true;
    this.right.isOpen = false;
  }
};

Node.prototype.isLeaf = function() {
  return this.left === null && this.right === null;
};

// module.exports.Tree = Tree;
// module.exports.Node = Node;
