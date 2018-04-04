var assert = require('assert');

// we need 8 test cases. I've provided the first 2
let inputs = [
  ["hello", 4],
  [6, "abc"],
  [null, 3],
  ["dog", 2],
  ["wow"],
  [200000],
  ["asdlajdlajsdlakjdslkajd", -2],
  ["", 2]
]

let outputs = [
  "o",
  undefined,
  undefined,
  "g",
  undefined,
  undefined,
  undefined,
  undefined
]

/*
Make this function return the letter at the specified position in the string. 
If no such letter exists, it should return undefined.

For example:
f(["hello", 1]); // e
f(["", 4]); // undefined
f(["abc", 0]); // a

*/
function f(x, y) {
    if (x == null || y == null) {
      return undefined
    }
    if (x.toString() !== x || isNaN(y) == true || x.charAt(y).length !== 1) {
      return undefined
    }
    return x.charAt(y)
}

function runTest(i) {
    var expected = outputs[i];
    var input = inputs[i];
    var actual = f(input[0], input[1]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);
runTest(5);
runTest(6);
runTest(7);