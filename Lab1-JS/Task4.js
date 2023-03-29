const wrapper = (func) => {
    let cache = {}
    return function (...args) {
        if (cache[args] !== undefined)
            return cache[args]
        cache[args] = func.apply(cache, args)
        return cache[args]
    }
};

//Example
const calc = (a, b, c) => a + b + c;
const cachedCalc = wrapper(calc);
console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache



