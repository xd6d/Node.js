const wrapper = (func: Function) => {
    let cache = {}
    return function (...args: unknown[]) {
        if (cache.hasOwnProperty(args.toString())) {
            console.log('from cache')
            type ObjectKey = keyof typeof cache
            return cache[args.toString() as ObjectKey]
        }
        let res = func.apply(cache, args)
        Object.defineProperty(cache, args.toString(), {
            value: res
        })
        return res
    }
};

//Example
const calc = (a: number, b: number, c: number) => a + b + c;
const cachedCalc = wrapper(calc);
console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2,2,3)); // 7 from cache
