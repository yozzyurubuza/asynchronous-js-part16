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

//Handling Rejected Promises
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    //2nd parameter - handling error
    .then(response => response.json())
    .then(data => {
      //Then also always returns a promise (fulfilled)
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      // Always return the promise and then handle it outside by simply continuing the chain
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    //Catch method - will catch any error in the promise chain
    //Catch also returns a promise
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    //Finally method - something that will always happen regardless if there is error or not
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});
