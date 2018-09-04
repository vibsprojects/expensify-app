const promise = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('This is my resolved data');    
        // reject('this is error');
    }, 5000);
});

console.log('Before');

promise.then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log(error);
});

console.log('After');