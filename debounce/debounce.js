const debounceInput = document.getElementById('debounceInput');
const debounceOutput = document.getElementById('debounceOutput');
const debounceDelayInput = document.getElementById('debounceDelay');
function debounce(func, delay) {
    /*
    this function will only execute the provided function after the specified delay has passed since
    the last time it was called. if the function is interupped by another call before the delay has passed
    the timer will reset and func will execute only after delay has passed since the last call.
    */
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this,args);
        }, delay);
    }
}


function createDebouncedHandler() {
    return debounce(handleInput, Number(debounceDelayInput.value) || 250)
}
// only create this debounced function once so the timer is preserved across calls
let debouncedHandleInput = createDebouncedHandler();


//'input' gets every change in input
//'change' only fires when input loses focus and is different from the previous value (good for <select> or  <input type="checkbox">)
debounceInput.addEventListener("input", (event) => {
    debouncedHandleInput(event.target.value);
})


// if the delay changes we need to create a new debounced function with the new delay
// otherwise the old delay will still be used
debounceDelayInput.addEventListener("input", () => {
    debouncedHandleInput = createDebouncedHandler();
})

function handleInput(input) {
    debounceOutput.textContent = input;
}
