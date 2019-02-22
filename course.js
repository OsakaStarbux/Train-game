 /*jshint esversion: 6 */
// a course constructor function
//
// consumes a tree of type courseTree and produces a Course
// Holds and updates our position in the course

function Course(courseTree) {

  this.courseTree = courseTree;
  this.currentNode = courseTree.root;

  this.train = new Train(this.currentNode);
  this.isFinished = function(){

    return this.currentNode.isLeaf;
  };
  this.currentState = new StartMenu();

  this.getNextNode = function(){
    // refresh the next node for all nodes in the tree
    this.courseTree.getNextNode();
    //assign nextnode
  //  this.nextNode = this.currentNode.nextNode;

    this.currentNode = this.currentNode.nextNode;
  };

  this.resetTrain = function(){

    // set the current train to a new train on the current node
    this.train = new Train(this.currentNode);
  };

  this.set_state = function(newState) {
    // if the cuurent state is not empty
    // call the exit actions to teardown the state
    if (this.currentState !== null){
      this.currentState.exitActions(this);
    }
    // set the new state
    this.currentState = newState;
    // call the entry actions to setup the state
    this.currentState.entryActions(this);
  };

  this.update = function(){
    /* Client calls to the wrapper function,  get delegated to the current
    state object. We need a reference back to the wrapper
    */
    this.currentState.update(this); // pass wrapper class "this" Course

  };

  this.showTracks = function() {

    this.courseTree.draw();
  };
}

function StartMenu() {

    this.menu = new Menu();

    this.handleClick = function(tree){
      console.log("StartMenu: clcik detected");
      let mousePos = createVector(mouseX, mouseY);
      if (this.menu.contains(mousePos)){
        console.log("click inside menu bounds");
        course.set_state(new Countdown());
      }

    };

    this.entryActions = function(){
      console.log("Current state: StartMenu");
      this.startTime = millis();
    };

    this.update = function(wrapper) {

    // do someething on every update call
      // show the tracks
      wrapper.showTracks();
      // show the train
      wrapper.train.show();


      this.menu.update();
      // show the menu
      this.menu.show();

    };

    this.exitActions = function(){
      // teardown and do things only once on exit
    };

}

function Countdown() {

  this.countdown = 5;
  this.period = 1000;
  this.startMillis = 0;

  this.handleClick = function(tree){
    console.log("Countdown: clcik detected");
  };

  this.showCountdown = function(count){
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
  };

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    console.log("Current state: Countdown");
     this.startMillis = millis();
  };

  this.update = function(wrapper) {
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
      console.log("Setting new state: LeadIn");
    }
  };

  this.exitActions = function(wrapper){
    // teardown and do things only once on exit
  };

}

function LeadIn(){

  this.handleClick = function(tree){
    tree.checkTreeClicked();
  };

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    console.log("Current state: LeadIn");


  };

  this.update = function(wrapper) {
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

      console.log("wrapper.train.hasFinishedCurrentSection");
      wrapper.set_state(new EnRoute());
    }

  };

  this.exitActions = function(wrapper){
    // teardown and do things only once on exit

  };



}


function EnRoute(){

  this.handleClick = function(tree){
    console.log("EnRoute: click detected");
    tree.checkTreeClicked();
  };

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    wrapper.getNextNode();
    wrapper.resetTrain();



    console.log("Current state: EnRoute");
  };

  this.update = function(wrapper) {
    // do someething on every update call


      //show the tracks
    wrapper.showTracks();
    //update the train
    wrapper.train.update(speed);
    //show the train
    wrapper.train.show();


    // if the track section is finished
    if (wrapper.train.hasFinishedCurrentSection) {
      console.log("train.hasFinishedCurrentSection");
      // switch to next section (increment course currentStep)
      // or if the course is finished: set state GameOver
      if (wrapper.isFinished()) {
        console.log("course isFiniahed is true");
        wrapper.set_state(new GameOver());
      } else {
        wrapper.set_state(new EnRoute());
      }
    }

  };

  this.exitActions = function(wrapper){
    // teardown and do things only once on exit

  };

}

function GameOver(){

  this.handleClick = function(tree){
    console.log("GameOver: click detected");
    course.set_state(new Restart());
  };

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    console.log("Current state: GameOver");
    setResult();
  };

  this.update = function(wrapper) {
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
  };

  this.exitActions = function(wrapper){
    // teardown and do things only once on exit
  };
}

function Restart(){

  this.handleClick = function(tree){
    console.log("Restart: click detected");
  };

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    console.log("Current state: Restart");
    setupGame();
  };

  this.update = function(wrapper) {

  };

  this.exitActions = function(wrapper){
    // teardown and do things only once on exit


  };
}


// module.exports = Course;
