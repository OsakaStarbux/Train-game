// a course constructor function
//
// consumes an array of type TracKSection and produces a Course
// Holds and updates our position in the course

function Course(trackSections) {

  this.trackSections = trackSections
  this.currentStep = 0;
  this.currentTrackSection = this.trackSections[this.currentStep];
  this.train = new Train(this.currentTrackSection);
  this.isFinished = function(){
    return this.currentStep >= this.trackSections.length - 1;
  }
  this.currentState = new StartMenu();

  this.incrementCurrentStep = function(){
    this.currentStep += 1;
  }

  this.resetTrain = function(){
    if (this.currentStep <= this.trackSections.length - 1){
      this.currentTrackSection = this.trackSections[this.currentStep];
    }
    this.train = new Train(this.currentTrackSection);
  }

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

    this.trackSections.forEach(function(section) {
      section.show();
    });
  }
}

function StartMenu() {

    this.menu = new Menu();

    this.handleClick = function(){
      console.log("StartMenu: clcik detected")
      let mousePos = createVector(mouseX, mouseY);
      if (this.menu.contains(mousePos)){
        console.log("click inside menu bounds")
        course.set_state(new Countdown());
      }

    }

    this.entryActions = function(){
      console.log("Current state: StartMenu")
      this.startTime = millis();
    }

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
    }

}

function Countdown() {

  this.countdown = 5;
  this.period = 1000;
  this.startMillis = 0;

  this.handleClick = function(){
    console.log("Countdown: clcik detected")
  }

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
  }

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    console.log("Current state: Countdown")
     this.startMillis = millis();
  }

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
  }

}

function LeadIn(){

  this.handleClick = function(){
    console.log("LeadIn: clcik detected")
  }

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    console.log("Current state: LeadIn")
  }

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
      // switch to next section (increment course currentStep)

      console.log("wrapper.train.hasFinishedCurrentSection")
      wrapper.set_state(new EnRoute());
    }

  };

  this.exitActions = function(wrapper){
    // teardown and do things only once on exit

  }

}


function EnRoute(){

  this.handleClick = function(){
    console.log("EnRoute: clcik detected")
  }

  this.entryActions = function(wrapper){
    // setup and do things only once on entry

    wrapper.incrementCurrentStep();
    wrapper.resetTrain()

    console.log("Current state: EnRoute")
  }

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
      console.log("train.hasFinishedCurrentSection")
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

  }

}

function GameOver(){

  this.handleClick = function(){
    console.log("GameOver: clcik detected")
  }

  this.entryActions = function(wrapper){
    // setup and do things only once on entry
    console.log("Current state: GameOver")

  }

  this.update = function(wrapper) {
    // do someething on every update call
    //show the tracks
    wrapper.showTracks();
    //show the train
    wrapper.train.show();


  };

  this.exitActions = function(wrapper){
    // teardown and do things only once on exit
  }
}
