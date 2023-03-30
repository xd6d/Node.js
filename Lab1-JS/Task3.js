function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

//Example
let testObj = {
    name: 'Artem',
    age: 19,
    nestedObject: {
        id: 1
    }
}

let copied = deepCopy(testObj)
console.log(copied === testObj) //false
testObj.nestedObject.id = 3
console.log(copied)
