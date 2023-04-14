const wrapper = (func: Function) => {
    let cache = {}
    return function (...args: unknown[]) {
        if (cache.hasOwnProperty(args.toString())) {
            console.log('from cache')
            return Object.getOwnPropertyDescriptor(cache, args.toString())?.value
        }
        Object.defineProperty(cache, args.toString(), func.apply(cache, args))
        return func.apply(cache, args)
    }
};

//Example
const calc = (a: number, b: number, c: number) => a + b + c;
const cachedCalc = wrapper(calc);
console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache
