/*
state machine
Uses a wrapper class to hold a reference to one of a collection of state classes.
*/

function GameState() {
  // initialize the currentState property with the initial state
  this.currentState = new StartMenu();
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

  this.update = function() {
    /* Client calls to the wrapper function,  get delegated to the current
    state object. We need a reference back to the wrapper
    */
    this.currentState.update(this); // pass wrapper class "this"
  };
}

function StartMenu() {
  this.menu = null;
  this.entryActions = function(){
    // setup and do things only once on entry
     this.menu = new Menu();
  }

  this.update = function(wrapper) {
    // do someething on every update call
    this.menu.show();
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

function CountDown() {

  this.entryActions = function(){
    // setup and do things only once on entry
  }

  this.update = function(wrapper) {
    // do someething

    // use a conditionals to decide:
    // - when to move to another state
    // - which state
    if (count <= 0) {
      wrapper.set_state(new playing());
    }

  };

  this.exitActions = function(){
    // teardown and do things only once on exit
  }

}

function ThirdState() {

  this.entryActions = function(){
    // setup and do things only once on entry
  }

  this.update = function(wrapper) {
    // do someething

    // use a conditionals to decide:
    // - when to move to another state
    // - which state
    if (true) {
      wrapper.set_state(new SecondState());
    }

    if (false) {
      wrapper.set_state(new InitialState());
    }
  };

  this.exitActions = function(){
    // teardown and do things only once on exit
  }
}

// let startMillis;
// let period;
// let gameState;
//
// function setup(){
//   createCanvas(500, 500);
//   gameState = new GameState();
//   noLoop();
// }
//
// function draw(){
//   background(51);
//   // do something regularly
//   currentMillis = millis();
//
//   if (currentMillis - startMillis >= period) {
//   // call update() on the gameState instance
//     startMillis = currentMillis;
//   }
//
// }
