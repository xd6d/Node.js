function isAnagram(s1: string, s2: string) {
    if (s1.length !== s2.length)
        return false
    let letters1: string[] = [...s1.toLowerCase()].sort()
    let letters2: string[] = [...s2.toLowerCase()].sort()
    for (let i: number = 0; i < letters1.length; i++)
        if (letters1[i] !== letters2[i])
            return false
    return true
}

//Example
console.log(isAnagram('abc', 'bac'))
