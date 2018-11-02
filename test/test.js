var expect = require('chai').expect;
var {p5} = require('../p5.min.js');
var TrackSection = require('../track').TrackSection;
var Train = require('../train').Train;
var Course = require('../course').Course;
var {helpers} = require('../helpers');

// Mocks

// function mockTrain(red, green, blue, alpha) {
//     // Mock of the color class from p5
//     this.levels = [];
//     this.levels[0] = red;
//     this.levels[1] = green;
//     this.levels[2] = blue;
//     this.levels[3] = alpha;
// }



describe('Course tests', function() {

  // beforeEach is a special function that is similar to the setup function in
  // p5.js.  The major difference it that this function runs before each it()
  // test you create instead of running just once before the draw loop
  // beforeEach lets you setup the objects you want to test in an easy fashion.
  beforeEach(function() {
  
  });

  it('should be an object', function(done) {
    expect(course).to.be.an('object');
    done();
  });

  it('should store initial values without mutation', function(done) {
    expect(course.currentStep).to.be.equal(0);
    done();
});


});
