var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  "hello world",
  "o m g",
  "WOW HELLO NOW",
  "oNe tW0 h123j",
  ""
]

let outputs = [
    "Hello World",
    "O M G",
    "Wow Hello Now",
    "One Tw0 H123j",
    ""
]

/*
Make this function return the input string, capitalized. You must use a for loop. For example:

f("hello world"); // Hello World
f("ALL YOUR BASE ARE BELONG"); // All Your Base Are Belong

*/
function f(str) {
    let arr = str.split(" ")
    let newStr = ""
    for (i = 0; i < arr.length; i++) {
        newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase() + " "
    }
    return newStr.trim()
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

