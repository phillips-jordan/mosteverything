var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    [[0, 1, 2, 3], [1, 3, 4, 5]],
    [[1, 2, 3], [1, 2, 3]],
    [2, 3],
    [[4, 6, 9], "no"],
    [[1, 2], [1, "dog"]]
]

let outputs = [
  [0, 2, 4, 5],
  [],
  undefined,
  undefined,
  [2, "dog"],
]

/*
Make this function return the elements that are unique to array1 and array2.
If there are no unique elements return an empty array.
If the inputs are anything other than arrays, return undefined. 
For example:

uniqueElements([0,1,2,3], [1,3,4,5]); // [0,2,4,5]
uniqueElements([1,2,3], [1,2,3]); // []
uniqueElements(2,3); // undefined, not arrays
*/
function f(arr1, arr2) {
    let uni = []
    if (arr1.constructor !== Array || arr2.constructor !== Array){
        return undefined
    }
    for (i =0; i<arr1.length; i++){
        if (arr2.indexOf(arr1[i]) == -1){
            uni.push(arr1[i])
        }
    }
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            uni.push(arr2[i])
        }
    }
    return uni
}

function runTest(i) {
    if(i > inputs.length) throw new Error("You do not have enough test cases");
    var expected = outputs[i];
    var input = inputs[i]
    var actual = f(input[0], input[1]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);

console.log("test cases passed")
