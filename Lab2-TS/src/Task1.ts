function add(number: number): Function {
    let sum: number = number

    function addImplicit(number?: number) {
        if (number === undefined)
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
console.log(add(1)(2)(3)())
