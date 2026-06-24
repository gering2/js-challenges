

function curry(fn) {
    function curried(...args) {
        /* if number of args passed is >= number of args expected by the function, call the function with the args
         otherwise, return a new function that takes the remaining args and calls curried with combined args (original + new) */
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            }
        }
        }
        return curried;
    }

/* the purpose of currying is to turn a function of multiple arguments into a nested
sequence of singular argument functions like add(1,2,3) => add(1)(2)(3) => 6
this allows for partial application of functions which enables the creation of 
reusable helper functions that can be used in different contexts. It helps with function composition. 

function fetchData(baseUrl, endpoint) {
  return fetch(`${baseUrl}/${endpoint}`);
}
const apiFetch = curry(fetchData)("api.com);

apiFetch("users");
apiFetch("posts");
apiFetch("comments");
*/