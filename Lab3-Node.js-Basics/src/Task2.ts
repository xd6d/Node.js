const array = [1, 2, 3, 6, 7, 9];

function arrayChangeDelete<T>(array: T[], toDelete: (item: T) => boolean) {
    let result = array.filter(toDelete)
    while (array.findIndex(toDelete) != -1)
        array.splice(array.findIndex(toDelete), 1)
    return result
}

const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log(array)
console.log(deletedElements)
