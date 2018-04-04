var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    [1, 2, 3],
    [1, 4, "arf", 7],
    [9, 8, [1, 2, 3]],
    [1, null, 3],
    []  
]

let outputs = [
  6,
  12,
  17,
  4,
  0
]

/*
Make this function return the sum of all the numbers in the input array. 
If any element in the array is not a number, skip it. If the array is empty, return zero.
*/
function f(arr) {
    let sum = arr.reduce((a,b) => {
        if (isNaN(a) == true) {
            a = 0
        }
        if (isNaN(b) == true) {
            b = 0
        }
        return a + b        
    }, 0)
    return sum 
}

function runTest(i) {
    if(i > inputs.length) throw new Error("You do not have enough test cases");
    var expected = outputs[i];
    var actual = f(inputs[i]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);

