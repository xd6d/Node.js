let sum = 0
function add(number) {
    if (arguments[0] === undefined)
        return sum
    sum += number
    return add
}

//Example
console.log(add(1)(2)(3)())