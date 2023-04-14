function deepCopy(obj: Object) {
    let created: object = JSON.parse(JSON.stringify(obj))
    for (let prop in obj) {
        let pd = Object.getOwnPropertyDescriptor(obj, prop);
        if (pd !== undefined && typeof pd.value === "function") {
             Object.defineProperty(created, prop, pd)
        }
    }
    return created
}

//Example
let testObj = {
    name: 'Artem',
    age: 19,
    nestedObject: {
        id: 1
    },
    doSmth: () => (console.log("smth"))
}

let copied = deepCopy(testObj)
console.log(copied)
console.log(copied === testObj) //false
testObj.nestedObject.id = 3
console.log(testObj)
console.log(copied)
