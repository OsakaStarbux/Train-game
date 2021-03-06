/*jshint esversion: 6 */
function buildTreeB(){

  let courseTreeB = new Tree();
  let rootVector = createVector(0, 0); //cnv.height / 2
  let root = new Node(rootVector, "STRAIGHT", "root");
  courseTreeB.root = root;

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

  root.left.left.right.right.addNodeRight(createVector(
      root.left.left.right.right.trackSection.endPoint.x,
      root.left.left.right.right.trackSection.endPoint.y), "RIGHT", "root-L-L-R-R-R");

      root.left.left.right.right.addNodeLeft(createVector(
          root.left.left.right.right.trackSection.endPoint.x,
          root.left.left.right.right.trackSection.endPoint.y), "LEFT", "root-L-L-R-R-R-L");

      root.left.left.right.right.right.addNodeRight(createVector(
          root.left.left.right.right.right.trackSection.endPoint.x,
          root.left.left.right.right.right.trackSection.endPoint.y), "STRAIGHT", "root-L-L-R-R-R-R");

          root.left.left.right.right.left.addNodeRight(createVector(
              root.left.left.right.right.left.trackSection.endPoint.x,
              root.left.left.right.right.left.trackSection.endPoint.y), "STRAIGHT", "root-L-L-R-R-R-R");

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


  root.left.left.right.right.right.right.isGoal = true;
  root.left.isOpen = false;
  root.right.isOpen = true;
  root.left.left.right.isOpen = false;
  root.left.left.right.right.right.isOpen = false;


  return courseTreeB;
}
