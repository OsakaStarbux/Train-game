 /*jshint esversion: 6 */

let expect = require('chai').expect;
let {p5} = require('../p5.min.js');
let TrackSection = require('../trackSection').TrackSection;
let Train = require('../train').Train;
let {helpers} = require('../helpers');
let Tree = require('../tree').Tree;
let Node = require('../tree').Node;
let  Course  = require('../course.js');
let courseTreeA = require('../courseTreeA');
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
    let courseTree = courseTreeA.buildTree();
    let course = new Course(courseTree);
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
