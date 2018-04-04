function square(x) {
    return x * x;
}

function decrement(x) {
    return x - 1;
}

function duplicateString(x) {
    return x.concat(x);
}
function reverseString(str) {
  var splitString = str.split(""); // var splitString = "hello".split("");
 
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
 
    return reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    
}
// Expand each of the following and get the result of the expression
// #1
console.log(square(decrement(square(decrement(3)))))

let x = decrement(3)
let y = square(x)
let z = decrement(y)
let a = square(z)

console.log(a)

// #2
console.log(decrement(decrement(square(square(3)))))

let b = square(3)
let c = square(b)
let d = decrement(c)
let e = decrement(d)

console.log(e)

// #3
console.log(duplicateString(reverseString("hello")))

let f = "hello"
let g = reverseString(f)
let h = duplicateString(g)

console.log(h)

// #4
console.log(reverseString(duplicateString(duplicateString("foo"))))

let i = "foo"
let j = duplicateString(i)
let k = duplicateString(j)
let l = reverseString(k)

console.log(l)
