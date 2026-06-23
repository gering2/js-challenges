function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        /*if the function arguments have been seen before, return the arguments key's value from the cache.
        otherwise store the arguments as  key (stringified) and set the value to the result of the function passed into the outer function.
        you still need to return the result of the function call in this case (not a memoized return) */ 
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}


//fn.apply keeps the context of the function call
/*
const obj = {
  x: 10,
  getY(y) {
    return this.x + y;
  }
};

obj.getY = memoize(obj.getY); // 'this' loses binding to obj as memoize returns a new function that is not bound to obj
obj.getY(5); // broken if `this` is lost
*/