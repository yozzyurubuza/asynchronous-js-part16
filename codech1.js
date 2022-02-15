'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

let setDelay = 1000;

const arrFunc = [
  [52.508, 13.381],
  [19.037, 72.873],
  [-33.933, 18.474],
];

//1. Create function
const whereAmI = function (lat, lng) {
  //2. Do "reverse geocoding", use API and do AJAX call
  const reverseGeoStr = `https://geocode.xyz/${lat},${lng}?geoit=json`;

  //5. This API allows you to make only 3 requests per second (1 sec delay)
  //   setTimeout(function () {
  fetch(reverseGeoStr)
    .then(response => {
      //5. Error handling
      if (!response.ok)
        throw new Error(`Request too fast (${response.status})`);

      return response.json();
    })
    .then(data => {
      //3. Log a message to the console with a meaningful description
      console.log(`You are in ${data.region}, ${data.country}`);
      getCountryData(data.country);
    })
    //4. Chain a catch method and log errors to the console
    .catch(errorMsg =>
      console.log(`Something went wrong (${errorMsg.message})`)
    );
  //   }, 1000);
};

// btn.addEventListener('click', function () {
//   arrFunc.forEach(value => {
//     setDelay += 1000;
//     setTimeout(() => {
//       whereAmI(value[0], value[1]);
//     }, setDelay);
//     console.log(setDelay);
//   });
//   setDelay = 1000;
// });

//Part 2

///////////////////////////////////////
const renderCountry = function (data, className = '') {
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
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
const getCountryData = function (country) {
  // Country
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      //Different error received, need to improvise
      const neighbour = data[0]?.borders && data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  arrFunc.forEach(value => {
    setDelay += 2000;
    setTimeout(() => {
      whereAmI(value[0], value[1]);
    }, setDelay);
  });
  setDelay = 1000;
});

//Jonas Schmedtmann Implementation

/*

//Part 1 (1-5)
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      console.log(res);

      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      //Part 2(6-7)
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

const renderCountry = function (data, className = '') {
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
};

*/
