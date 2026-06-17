function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

const tasks = [
  () => delay(1000),
  () => delay(500),
  () => delay(2000)
];

// execute tasks sequentially
async function executeTasksSequentially(tasks) {
    for(const task of tasks) {
        await task();
    }
}


function customPromiseAll(promises) {
      /*promise all takes an iterable of promises and returns a single promise 
      if any of the promises reject, the returned promise is rejected with the reason of the first promise that rejected.
      if all promises resolve, the returned iterable of promises is returned maaintaining order of input */
    
    return new Promise((resolve, reject) => {

        if(promises.length === 0 ) {
            return resolve([]);
        }
        const results = [];
        let completedCount = 0;
        promises.forEach((promise,index) => { // don't use for of 
            Promise.resolve(promise).then((res) => {
                results[index] = res; // maintain order of results
                completedCount++;

                if(completedCount === promises.length) {   //resolve if all promises have completed
                    resolve(results);
                }

        }).catch((err) => {
            reject(err); // if any promise rejects, reject the whole promise
        })
        })
    })
}

function customPromiseRace(promises) {
    //attach a then to each promise, the first one to resolve or reject will settle the outer promise
    return new Promise((resolve,reject) => {
        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve).catch(reject)
            })
        })
    }

function customPromiseAny(promises) {
    //takes an iterable of promises and returns the first promise to fufill. if all promises fail then outer promise rejects
    let rejectCount = 0
    return new Promise((resolve,reject) => {
        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve).catch(() =>{ 
                rejectCount++ 
                if(rejectCount === promises.length) {
                    reject('all promises rejected');
                }
            })
        })
       
    })
 
}

    function customPromiseAllSettled(promises) {
        //takes an iterable of promises and returns a fufilled promise once every promise settles
        //this fulfilled promise includes an array of objects that have the result of each settled promise
        let pCount = 0
        const res = []
        return new Promise((resolve,reject) => {
            if(promises.length === 0) {
                resolve([])
                return
            }

            promises.forEach((promise,index) => {
                Promise.resolve(promise).then((result) => {
                    res[index] = {status: 'fufilled', value: result}
                    pCount += 1
                    if(pCount === promises.length) {
                        resolve(res)
                    }
                }
                ).catch((error) => {
                    res[index] = {status: 'rejected', reason: error}
                    pCount += 1
                    if(pCount === promises.length) {
                        resolve(res)
                    }
                })
            })
        })
    }