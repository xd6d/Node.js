function add(number) {
    if (arguments[0] === undefined)
        return 0
    let sum = number

    function addImplicit(number) {
        if (arguments[0] === undefined)
            return sum
        sum += number
        return addImplicit
    }

    return addImplicit
}


//Example
console.log(add(1)(2)(3)())
console.log(add(3)(2)(3)())
console.log(add(500)())
console.log(add())
console.log(add(1)(2)(3)())
