var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "Make this function return the input string wrapped to 40 characters per line.",
    "If the next character after a cut is a space, then do not display it.",
    "Lorem ipsumos dolor sit amet consectetur adipisicing elit. Magni quisquam",
    "Debugger listening on ws://127.0.0.1:4", 
    "This means you'll have to insert a newline character after every 40 characters in the input string."
]

let outputs = [
    "Make this function return the input stri\nng wrapped to 40 characters per line.",
    "If the next character after a cut is a s\npace, then do not display it.",
    "Lorem ipsumos dolor sit amet consectetur\nadipisicing elit. Magni quisquam",
    "Debugger listening on ws://127.0.0.1:4", 
    "This means you'll have to insert a newli\nne character after every 40 characters i\nn the input string."
]

/*
Make this function return the input string wrapped to 40 characters per line. 
This means you'll have to insert a newline \n character after every 40 characters in the input string. 
If the next character after a cut is a space, then do not display it. 

For example with the input:

Lorem ipsumos dolor sit amet consectetur adipisicing elit. Magni quisquam

the output would be:

Lorem ipsumos dolor sit amet consectetur
adipisicing elit. Magni quisquam

instead of:

Lorem ipsumos dolor sit amet consectetur
 adipisicing elit. Magni quisquam

 even though there is a space before the a in adipisicing
*/
function f(str) {
    let newstr = str.slice(0, 40).trim()
if (str.length<39){
    return newstr
}

let count = Math.floor(str.length/40)
for (i=40; i<str.length; i+=40){
    newstr = newstr + "\n" + str.slice(i, (i+40)).trim()
    count--
    if (count < 1){
        return newstr.trim()
}
}
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
console.log('pass')