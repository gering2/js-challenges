function deepCopy(item) {
    if (item === null || typeof item !== "object") { //arrays are of type object, functions have their own special tyepof "function"
        return item;
    }
    itemCopy = Array.isArray(item) ? [] : {};
    for (let key in item) {
        itemCopy[key] = deepCopy(item[key]); //build a new version of item[key] (new memory location)
    }
    return itemCopy;
}


/*
a = {x:1}
b = {}
b.x = a.x // since x is a primitive, b.x will be a copy not a reference to a.x, so different memory location
console.log(a.x === b.x) // true because they both reference the same primitive value 1
console.log(a === b) // false because a and b are different objects in memory
*/