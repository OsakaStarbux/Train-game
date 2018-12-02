// a course constructor function
//
// consumes an array of type TracKSection and produces a Course
// Holds and updates our position in the course

function Course(trackSections) {

  this.trackSections = trackSections
  this.currentStep = 0;
  this.currentTrackSection = this.trackSections[this.currentStep];
  this.train = new Train(this.currentTrackSection);
  this.isFinished = false;
  this.surrentState = StartMenu();

  this.set_state = function(newState) {
    // if the cuurent state is not empty
    // call the exit actions to teardown the state
    if (this.currentState !== null){
      this.currentState.exitActions();
    }
    // set the new state
    this.currentState = newState;
    // call the entry actions to setup the state
    this.currentState.entryActions();
  };

  this.update = function(){
    /* Client calls to the wrapper function,  get delegated to the current
    state object. We need a reference back to the wrapper
    */
    this.currentState.update(this); // pass wrapper class "this"
  };



  this.showTracks = function() {

    this.trackSections.forEach(function(section) {
      section.show();
    });
  }


  }

  StartMenu() {
    this.menu = null;
    this.entryActions = function(){
      // setup and do things only once on entry
       this.menu = new Menu();
    }

    this.update = function(wrapper) {
      // do someething on every update call

      // show the menu
      this.menu.show();
      // show the train
      wrapper.train.show();
      // show the tracks
      wrapper.showTracks();
      // use a conditionals to decide:
      // - when to move to another state
      // - which state
      if (currentCourse != null) {
        wrapper.set_state(new CountDown());
      }
    };

    this.exitActions = function(){
      // teardown and do things only once on exit

    }

}


EnRoute(){

  this.entryActions = function(){
    // setup and do things only once on entry
  }

  this.update = function(wrapper) {
    // do someething on every update call
    //show the tracks
    wrapper.showTracks();
    //update the train
    wrapper.train.update(speed);
    //show the train
    wrapper.train.show();

    // use a conditionals to decide:
    // - when to move to another state
    // - which state
    if (currentCourse.isFinished) {
      wrapper.set_state(new GameOver());
    }
  };

  this.exitActions = function(){
    // teardown and do things only once on exit
  }


        if (this.currentStep <= this.trackSections.length - 1) {

          if (this.train.hasFinishedCurrentSection) {
          // switch to next section (increment this.currentStep)
            this.currentStep += 1;

            if (this.trackSections[this.currentStep]){
            this.currentTrackSection = this.trackSections[this.currentStep]
            // create a new train with reset state
            this.train = new Train(this.currentTrackSection);
            this.train.currentTrackSection = this.trackSections[this.currentStep];
            }
          }
      




}






//module.exports.Course = Course;
