var promise = Promise.resolve('test')
console.log(promise, 'promise')
var tPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(test)
  }, 2000)
})

promise.then(res => {
  tPromise
}, err => {
  console.log(err, 'err')
})