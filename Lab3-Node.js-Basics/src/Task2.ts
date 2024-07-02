const array = [1, 2, 3, 6, 7, 9];

function arrayChangeDelete<T>(array: T[], toDelete: (item: T) => boolean) {
    let result: T[] = []
    for (let [i, element] of array.entries()) {
        if (toDelete(element)) {
            array.splice(i, 1)
            result.push(element)
        }
    }
    return result
}

const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log(array)
console.log(deletedElements)
