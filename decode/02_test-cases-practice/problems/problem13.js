var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "RADAR",
    "JAVASCRIPT",
    "A",
    "",
    "12FoLOf21"
]

let outputs = [
    true,
    false,
    true,
    true,
    true  
]

/*
Make this function return true if the input string is a palindrome, and false otherwise.
 A palindrome is simply a string that is the same if you reverse it.

RADAR -> Yes
JAVASCRIPT -> No
*/
function f(str) {
    return str.toLowerCase() == str.toLowerCase().split('').reverse().join('')    
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

