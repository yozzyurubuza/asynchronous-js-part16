'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
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
  //   countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    //Create new Error then pass a message (error message)
    //Then throw keyword will immediately terminate the current function, just like return
    //The effect of creating a throw error is that the promise will immediately reject.
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

//Throwing Errors Manually
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     //2nd parameter - handling error
//     .then(response => {
//       console.log(response);
//       if (!response.ok) throw new Error(`${errorMsg}} (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       //Then also always returns a promise (fulfilled)
//       renderCountry(data[0]);
//       //   const neighbour = data[0].borders[0];
//       const neighbour = 'dasdsaasda';

//       if (!neighbour) return;

//       // Country 2
//       // Always return the promise and then handle it outside by simply continuing the chain
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     //Catch method - will catch any error in the promise chain
//     //Catch also returns a promise
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     //Finally method - something that will always happen regardless if there is error or not
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// https://restcountries.com/v3.1/alpha/${neighbour}

//Refactoring
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
  getCountryData('portugal');
});

getCountryData('australia');
