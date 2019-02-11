/*jshint esversion: 6 */
function buildTree(){

  let courseTreeA = new Tree();
  let rootVector = createVector(0, 0); //cnv.height / 2
  let root = new Node(rootVector, "STRAIGHT", "root");
  courseTreeA.root = root;

// left

  root.addNodeLeft(createVector(
    root.trackSection.endPoint.x,
    root.trackSection.endPoint.y), "LEFT", "root-L");

  root.left.addNodeLeft(createVector(
      root.left.trackSection.endPoint.x,
      root.left.trackSection.endPoint.y), "STRAIGHT", "root-L-L");

  root.left.left.addNodeLeft(createVector(
      root.left.left.trackSection.endPoint.x,
      root.left.left.trackSection.endPoint.y), "LEFT", "root-L-L-L");

      root.left.left.left.addNodeLeft(createVector(
          root.left.left.left.trackSection.endPoint.x,
          root.left.left.left.trackSection.endPoint.y), "STRAIGHT", "root-L-L-L-L");

  root.left.left.addNodeRight(createVector(
      root.left.left.trackSection.endPoint.x,
      root.left.left.trackSection.endPoint.y), "RIGHT", "root-L-L-R");

      root.left.left.right.addNodeRight(createVector(
          root.left.left.right.trackSection.endPoint.x,
          root.left.left.right.trackSection.endPoint.y), "STRAIGHT", "root-L-L-R-R");

// right

  root.addNodeRight(createVector(
      root.trackSection.endPoint.x,
      root.trackSection.endPoint.y), "RIGHT", "root-R");

  root.right.addNodeRight(createVector(
      root.right.trackSection.endPoint.x,
      root.right.trackSection.endPoint.y), "STRAIGHT", "root-R-R");

  root.right.right.addNodeRight(createVector(
      root.right.right.trackSection.endPoint.x,
      root.right.right.trackSection.endPoint.y), "RIGHT", "root-R-R-R");

      root.right.right.right.addNodeRight(createVector(
          root.right.right.right.trackSection.endPoint.x,
          root.right.right.right.trackSection.endPoint.y), "STRAIGHT", "root-R-R-R-R");


  root.right.right.right.right.isGoal = true;
  root.right.isOpen = false;
  root.left.left.right.isOpen = false;
  root.left.isOpen = true;


  return courseTreeA;
}

          // module.exports.buildTree = buildTree();
