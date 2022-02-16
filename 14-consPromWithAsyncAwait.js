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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Consuming Promises with Async/Await

//Adding keyword async will turn the function into Asynchronous
const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();

  const { latitude: lat, longitude: lng } = pos.coords;

  // Reverse geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  //Country data

  //await will stop the code execution at this point until the promise is fulfilled
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  console.log(res);

  //Similar approach using then ^
  //   fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
whereAmI();
console.log('FIRST');
