const throttleInput = document.getElementById('throttleInput');
const throttleOutput = document.getElementById('throttleOutput');
const throttleDelayInput = document.getElementById('throttleDelay');

function throttle(func, delay) {
    /*executes the provided function once every specified delay at most. 
    if called multiple times while waiting for delay, only the first call will execute 
    (vs in debounce where the delay resets) */

     let previousCall = 0

    return function(...args) {
        let now = Date.now();
        if(now - previousCall >= delay) {
            previousCall = now;
            func.apply(this,args)
         
        }
    

    }   
}

function createThrottledHandler() {
    return throttle(handleThrottleInput, Number(throttleDelayInput.value) || 250);
}

let throttledInput = createThrottledHandler();

throttleInput.addEventListener("input", (event) => {
    throttledInput(event.target.value);
})

function handleThrottleInput(input) {
    throttleOutput.textContent = input;
}

throttleDelayInput.addEventListener("input", () => {
    throttledInput = createThrottledHandler();
});