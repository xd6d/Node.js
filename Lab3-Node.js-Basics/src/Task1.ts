export {}
const array: Array<string> = ["one", "two", "three"];

async function runSequent<T>(array: Array<T>, fn: (item: T, index: number) => Promise<{ item: T; index: number }>) {
    const res: { item: T; index: number }[] = []
    for await (let [i, element] of array.entries()){
        res.push(await fn(element, i))
    }
    return res
}
async function task() {
    const results = await runSequent(array, (item, index) =>
        Promise.resolve({
            item,
            index,
        }));
    console.log(results)
}

task()
