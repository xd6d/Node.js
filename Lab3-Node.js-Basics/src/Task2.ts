const array = [1, 2, 3, 6, 7, 9];

function arrayChangeDelete<T>(array: T[], toDelete: (item: T) => boolean) {
    let result = array.filter(toDelete)
    let index = array.findIndex(toDelete)
    while (index != -1) {
        array.splice(index, 1)
        index = array.findIndex(toDelete)
    }
    return result
}

const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log(array)
console.log(deletedElements)
