function promiseQueue(tasks,concurrency=1) {
    let queue = [...tasks]; // create a copy of the tasks array to avoid mutating the original;
    let activeTasks = 0;
  
    scheduleTask(); // start schedulingx tasks 

    function scheduleTask() {
        while(queue.length > 0 && activeTasks < concurrency) {
            const task = queue.shift();
            activeTasks++;
            // s
            task().finally(() => {
                // regardless of if promise resolves or rejects, finally will execute 
                activeTasks--;
                scheduleTask(); // schedule the next task when the current one finishes
                //  if queue is empty or concurrency limit is reached, scheduleTask will not do anything 
                // until the next task finishes and calls scheduleTask again
            });
        }
    }
}

const A = () => new Promise(resolve =>  {
    console.log('A started');
    setTimeout(() => {
        console.log('A finished');
        resolve('A');
    }, 1000);
});
const B = () => new Promise(resolve =>  {
    console.log('B started');
    setTimeout(() => {
        console.log('B finished');
        resolve('B');
    }, 500);
});
const C = () => new Promise(resolve =>  {
    console.log('C started');
    setTimeout(() => {
        console.log('C finished');
        resolve('C');
    }, 2000);
});
const D = () => new Promise(resolve =>  {
    console.log('D started');
    setTimeout(() => {
        console.log('D finished');
        resolve('D');
    }, 1500);
});

promiseQueue([A,B,C,D], 2);