 /*jshint esversion: 6 */

/*
This code is based on the example at processing.org in Java by Jakub Valtar www.jakubvaltar.com

"Examples/Topics/Curves/ArcLengthParametrization"

https://github.com/processing/processing-docs/tree/master/content/examples/Topics/Curves/ArcLengthParametrization

Functions getPointAtFraction() and getPointAtLength()
return points at fixed distances.

I want to move an object along the curve at a fixed speed
and draw things equally spaced on curves.

BezierCurve consumes four points as
P5.Vector objects a, b, c, d

The BezierCurve object exposes the following methods:
pointAtParameter(t): returns a point on the curve at t

length: returns the length of the curve

pointAtFraction(fraction): returns a point at fraction of the curve length e.g. 0.25 is a quarter of the length

pointAtLength(length) : returns a point at a specified arc length along the curve.

equidistantPoints(howMany)  Returns an array of (howMany) equidistant p5.Vector points on the curve

points(howMany): returns an array of (howMany)points on the curve

offsetPoints(howMany, dist, angle): calculates points running parallel to the curve at "dist" pixels from the bezier given the angle from the tangent. These points can be used to draw a parallel curve

tangentPoints(howMany): returns an array of angles in radians that are tangents from "howMany" equidstant points. These angles can be used to orient an object in the direction of the curve at that point.

*/

class BezierCurve {
  constructor(a, b, c, d){
    // Constants
    this.SEGMENT_COUNT = 100;
    //properties
    // these props should be of type P5.Vector
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d;

    this.arcLengths = [];
    this.curveLength = 0;
    this.prev = this.v0.copy();
    this.arcLength = 0;

    // i goes from 0 to SEGMENT_COUNT
    for (let i = 0; i <= this.SEGMENT_COUNT; i++) {
      // map index from range (0, SEGMENT_COUNT) to parameter in range (0.0, 1.0)
      let t = i / this.SEGMENT_COUNT;

      // get point on the curve at this parameter value
      let point = this.pointAtParameter(t);

      // get distance from previous point
      let distanceFromPrev = p5.Vector.dist(this.prev, point);

      // add arc length of last segment to total length
      this.arcLength += distanceFromPrev;

      // save current arc length to the look up table
      this.arcLengths[i] = this.arcLength;

      // keep this point to compute length of next segment
      this.prev.set(point);

      // Here we have sum of all segment lengths, which should be
      // very close to the actual length of the curve. The more
      // segments we use, the more accurate it becomes.
      this.curveLength = this.arcLength;
    }
  }


  // Returns a point along the curve at a specified parameter value.
  pointAtParameter(t) {
    let result = createVector(0, 0);
    result.x = bezierPoint(this.v0.x, this.v1.x, this.v2.x, this.v3.x, t);
    result.y = bezierPoint(this.v0.y, this.v1.y, this.v2.y, this.v3.y, t);
    return result;
  }

  // Returns the length of this curve
  length() {
    return this.curveLength;
  }

  // Returns a point at a fraction of curve's length.
  // Example: pointAtFraction(0.25) returns point at one quarter of curve's length.
  pointAtFraction(r) {
    let wantedLength = this.curveLength * r;
    return this.pointAtLength(wantedLength);
  }

  // Returns a point at a specified arc length along the curve.
  pointAtLength(wantedLength) {
    wantedLength = constrain(wantedLength, 0.0, this.curveLength);

    // look up the length in our look up table
    // binarySearch requires a sorted array
    // JS defaults to sorting by string so provide a function for sorting numbers
    // let sortedArray = array.sort(function(a, b){return a-b});
    let index = binarySearch(this.arcLengths, wantedLength);

    let mappedIndex;

    if (index < 0) {
      // if the index is negative, exact length is not in the table,
      // but it tells us where it should be in the table
      // see http://docs.oracle.com/javase/7/docs/api/java/util/Arrays.html#binarySearch(float[], float)

      // interpolate two surrounding indexes
      let nextIndex = -(index + 1);
      let prevIndex = nextIndex - 1;
      let prevLength = arcLengths[prevIndex];
      let nextLength = arcLengths[nextIndex];
      mappedIndex = map(
        wantedLength,
        prevLength,
        nextLength,
        prevIndex,
        nextIndex
      );
    } else {
      // wanted length is in the table, we know the index right away
      mappedIndex = index;
    }

    // map index from range (0, SEGMENT_COUNT) to parameter in range (0.0, 1.0)
    let parameter = mappedIndex / this.SEGMENT_COUNT;

    return this.pointAtParameter(parameter);
  }

  // Returns an array of equidistant p5.Vector points on the curve
  equidistantPoints(howMany) {
    let resultPoints = [];

    // we already know the beginning and the end of the curve
    resultPoints[0] = this.v0.copy();
    resultPoints[howMany - 1] = this.v3.copy();

    let arcLengthIndex = 1;
    for (let i = 1; i < howMany - 1; i++) {
      // compute wanted arc length
      let fraction = i / (howMany - 1);
      let wantedLength = fraction * this.curveLength;

      // move through the look up table until we find greater length
      while (
        wantedLength > this.arcLengths[arcLengthIndex] &&
        arcLengthIndex < this.arcLengths.length
      ) {
        arcLengthIndex++;
      }

      // interpolate two surrounding indexes
      let nextIndex = arcLengthIndex;
      let prevIndex = arcLengthIndex - 1;
      let prevLength = this.arcLengths[prevIndex];
      let nextLength = this.arcLengths[nextIndex];
      let mappedIndex = map(
        wantedLength,
        prevLength,
        nextLength,
        prevIndex,
        nextIndex
      );

      // map index from range (0, SEGMENT_COUNT) to parameter in range (0.0, 1.0)
      let parameter = mappedIndex / this.SEGMENT_COUNT;

      resultPoints[i] = this.pointAtParameter(parameter);
    }

    return resultPoints;
  }

  // Returns an array of points on the curve.
  points(howMany) {
    let resultPoints = [];

    // we already know the first and the last point of the curve
    resultPoints[0] = this.v0.copy();
    resultPoints[howMany - 1] = this.v3.copy();

    for (let i = 1; i < howMany - 1; i++) {
      // map index to parameter in range (0.0, 1.0)
      let parameter = i / (howMany - 1);

      resultPoints[i] = this.pointAtParameter(parameter);
    }

    return resultPoints;
  }

  offsetPoints(howMany, dist, angle) {
    let resultPoints = [];

    for (let i = 0; i <= howMany; i++) {
      let t = i / howMany;

      // the first step is to find the point on the curve
      // order of arguments: cp1 ap1 ap2 cp2
      let point = this.pointAtParameter(t);
      // the next step is to find the tangent vector
      //order of arguments: cp1 ap1 ap2 cp2
      let tx = bezierTangent(this.v0.x, this.v1.x, this.v2.x, this.v3.x, t);
      let ty = bezierTangent(this.v0.y, this.v1.y, this.v2.y, this.v3.y, t);
      let a = atan2(ty, tx);
      // then rotate back 90 degress or HALF_PI
      a -= angle;

      // calcualte a point a fixed distance along the normal
      let newPoint = {
        x: cos(a) * dist + point.x,
        y: sin(a) * dist + point.y
      };
      // push the point onto the point array
      resultPoints.push(newPoint);
    }

    return resultPoints;
  }

  tangentPoints(howMany) {
    let result = [];

    for (let i = 0; i <= howMany; i++) {
      let t = i / howMany;
      let tx = bezierTangent(this.v0.x, this.v1.x, this.v2.x, this.v3.x, t);
      let ty = bezierTangent(this.v0.y, this.v1.y, this.v2.y, this.v3.y, t);
      let a = atan2(ty, tx);

      // push the point onto the result array
      result.push(a);
    }
    return result;
  }
}

// Binary Search based on code at https://dev.to/stepho/linear-and-binary-search-in-javascript-4b7h
function binarySearch(sortedArray, elt) {
  let lowIndex = 0;
  let highIndex = sortedArray.length - 1;

  while (lowIndex <= highIndex) {
    let midIndex = Math.floor((lowIndex + highIndex) / 2);
    if (sortedArray[midIndex] == elt) {
      return midIndex;
    } else if (sortedArray[midIndex] < elt) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }
  return -(lowIndex + 1);
}
