'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    //Similar approach
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function (lat, lng) {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
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

btn.addEventListener('click', whereAmI);
