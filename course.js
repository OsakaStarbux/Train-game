// a course constructor function
function Course(trackSections) {

  this.trackSections = trackSections
  this.currentStep = 0;
  this.currentTrackSection = this.trackSections[this.currentStep];
  this.train = new Train(this.currentTrackSection);
  this.isFinished = false;

  this.updatetracks = function() {

    this.trackSections.forEach(function(section) {
      section.show();
    });
  }

  this.update = function() {
    this.updatetracks();

    if (!this.isFinished) {
      // show all the tracks all the time
      if (this.currentStep <= this.trackSections.length - 1) {
        
        // update train on current section
        this.train.update(speed);
     		
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
      } else {
        // end of course

        console.log("Finished course")
        this.isFinished = true;
      }
      
    }
    //show the train here, it will render even if it is finished the course
    this.train.show();
  };
}