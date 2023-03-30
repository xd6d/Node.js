function isAnagram(s1, s2) {
    if (s1.length !== s2.length)
        return false
    let letters1 = [...s1.toLowerCase()].sort()
    let letters2 = [...s2.toLowerCase()].sort()
    for (let i=0; i<letters1.length; i++)
        if (letters1[i] !== letters2[i])
            return false
    return true
}

//Example
console.log(isAnagram('abc', 'bac'))
