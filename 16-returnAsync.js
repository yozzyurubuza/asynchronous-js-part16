'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  //Format of restcountries changed, needed to improvise to get first object.
  const firstLang = Object.values(data.languages)[0];
  const firstCurr = Object.values(data.currencies)[0].name;

  const html = `
      <article class="country ${className}">
              <img class="country__img" src="${data.flags.png}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${firstLang}</p>
                <p class="country__row"><span>💰</span>${firstCurr}</p>
              </div>
            </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Returning Values from Async Function

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    //Country data
    //await will stop the code execution at this point until the promise is fulfilled
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.log(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    //Re-throw the error when the async function has a return
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city); // Will return Promise {<pending>}
//The promise is still fulfilled, not rejected even with error
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

/*
(async function (promise) {
  try {
    console.log(`2: ${await promise}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  } finally {
    console.log('3: Finished getting location');
  }
})(whereAmI());
*/

//Jonas Schmedtmann Implementation

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();
