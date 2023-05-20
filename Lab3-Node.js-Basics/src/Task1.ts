export {}
const array: Array<string> = ["one", "two", "three"];

async function runSequent<T>(array: Array<T>, fn: (item: T, index: number) => Promise<Awaited<{ item: T; index: number }>>) {
    const res = []
    for (let i = 0; i<array.length; i++){
        res.push(await fn(array[i], i))
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
