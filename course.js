 /*jshint esversion: 6 */
// a course constructor function
//
// consumes a tree of type courseTree and produces a Course
// Holds and updates our position in the course

class Course {
  constructor(courseTree){
    this.courseTree = courseTree;
    this.currentNode = courseTree.root;

    this.train = new Train(this.currentNode);
    this.isFinished = function(){

      return this.currentNode.isLeaf;
    };
    this.currentState = new StartMenu();
  }

  getNextNode(){
    // refresh the next node for all nodes in the tree
    this.courseTree.getNextNode();
    //assign nextnode
  //  this.nextNode = this.currentNode.nextNode;

    this.currentNode = this.currentNode.nextNode;
  }

  resetTrain(){

    // set the current train to a new train on the current node
    this.train = new Train(this.currentNode);
  }

  set_state(newState) {
    // if the cuurent state is not empty
    // call the exit actions to teardown the state
    if (this.currentState !== null){
      this.currentState.exitActions(this);
    }
    // set the new state
    this.currentState = newState;
    // call the entry actions to setup the state
    this.currentState.entryActions(this);
  }

  update(){
    /* Client calls to the wrapper function,  get delegated to the current
    state object. We need a reference back to the wrapper
    */
    this.currentState.update(this); // pass wrapper class "this" Course

  }

  showTracks() {

    this.courseTree.draw();
  }
}

class StartMenu {
  constructor(){
    this.menu = new Menu();
  }

  handleClick(tree) {
    let mousePos = createVector(mouseX, mouseY);
    if (this.menu.contains(mousePos)){
        course.set_state(new Countdown());
    }
  }

  entryActions() {
    this.startTime = millis();
  }

  update(wrapper) {
    // do someething on every update call
    // show the tracks
    wrapper.showTracks();
    // show the train
    wrapper.train.show();
    this.menu.update();
    // show the menu
    this.menu.show();
    }

  exitActions() {
      // teardown and do things only once on exit
    }
}

class Countdown {
  constructor() {
    this.countdown = 5;
    this.period = 1000;
    this.startMillis = 0;
  }

  handleClick(tree){

  }

  showCountdown(count){
    let countText;
    if (count > 0){
      countText = count.toString();
    } else {
      countText = "";
    }
    push();
    resetMatrix();
    fill(255,255,255,200);
    textSize(height / 2);
    textAlign(CENTER, CENTER);
    text(countText, width / 2, height / 2);
    pop();
  }

  entryActions(wrapper) {
    // setup and do things only once on entry
    this.startMillis = millis();
  }

  update(wrapper) {
    // do someething on every update call
    // check elapsed time
    let currentTime = millis();
    // if period time elpased update the countdown
    if (currentTime > this.startMillis + this.period){
      if (this.countdown > 0){
        this.countdown -= 1;
      }
      // reset start miills!!!
      this.startMillis = currentTime;
    }
    // show the countdown
    this.showCountdown(this.countdown);

    // show the tracks
    wrapper.showTracks();
    // show the train but dont update (move) it
    wrapper.train.show();

    if (this.countdown <= 0) {
      wrapper.set_state(new LeadIn());
    }
  }

  exitActions(wrapper) {
    // teardown and do things only once on exit
  }

}

class LeadIn{
  constructor() {

  }

  handleClick(tree) {
    tree.checkTreeClicked();
  }

  entryActions(wrapper){
    // setup and do things only once on entry
  }

  update(wrapper) {
    // do someething on every update call
      //show the tracks
    wrapper.showTracks();
    //update the train
    wrapper.train.update(speed);
    //show the train
    wrapper.train.show();
    //if the track section is finished: set next track section
    // This is the first track section so we won't check
    // if the course is finished
    if (wrapper.train.hasFinishedCurrentSection) {
      // switch to next section
      wrapper.set_state(new EnRoute());
    }
  }

  exitActions(wrapper) {
    // teardown and do things only once on exit
  }
}


class EnRoute{
  constructor(){

  }
  handleClick(tree) {
    tree.checkTreeClicked();
  }

  entryActions(wrapper) {
    // setup and do things only once on entry
    wrapper.getNextNode();
    wrapper.resetTrain();
  }

  update(wrapper) {
    // do someething on every update call
    //show the tracks
    wrapper.showTracks();
    //update the train
    wrapper.train.update(speed);
    //show the train
    wrapper.train.show();
    // if the track section is finished
    if (wrapper.train.hasFinishedCurrentSection) {
      // switch to next section (increment course currentStep)
      // or if the course is finished: set state GameOver
      if (wrapper.isFinished()) {

        wrapper.set_state(new GameOver());
      } else {
        wrapper.set_state(new EnRoute());
      }
    }

  }

  exitActions(wrapper){
    // teardown and do things only once on exit
  }
}

class GameOver {
  constructor(){

  }

  handleClick(tree){
    course.set_state(new Restart());
  }

  entryActions(wrapper) {
    // setup and do things only once on entry
    setResult();
  }

  update(wrapper) {
    // do someething on every update call
    //show the tracks
    wrapper.showTracks();
    //show the train
    wrapper.train.show();
    push();
    resetMatrix();
    fill(255,255,255,200);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(resultMsg, width / 2, height / 2);
    fill(255,0,255,200);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Click to play again", width / 2, height / 2 + 50);
    pop();
  }

  exitActions(wrapper) {
    // teardown and do things only once on exit
  }
}

class Restart {
  constructor() {

  }

  handleClick(tree) {

  }

  entryActions(wrapper) {
    // setup and do things only once on entry
    setupGame();
  }

  update(wrapper) {

  }

  exitActions(wrapper) {
    // teardown and do things only once on exit
  }
}
