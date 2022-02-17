'use strict';

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

//Other Promise Combinators: race, allsettled, and any

// Needs array and returns an array
// Is settled as soon as one of the input promises settles (rejected or fulfilled)
// Promise.race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

//Real-world example
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// Takes in an array of promise, then returns the array of all the settled promises (resolve or reject).

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//Promise.all short-circuits the array (&&)
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//Promise.any
// Takes an array then return the 1st one that resolves, and ignores all the others
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
