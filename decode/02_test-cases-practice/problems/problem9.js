var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "hello my grandfather",
    "wow a and a a how",
    "Butter 1234567",
    "",
    "no"
]

let outputs = [
    "grandfather",
    "how",
    "1234567",
    "",
    "no"  
]

/*
Make this function return the longest word in the input string. If the input string is empty then return an empty string.
If multiple words have the same length, return the last one that matches.
*/
function f(str) {
    let lon = str.split(' ').reduce((a, b) => {      
            if (b.length >= a.length) {
                return b
            }
            else {
                return a
            }
    });
    return lon
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

