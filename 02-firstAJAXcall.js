'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//CORS = Cross Origin Resource Sharing = Yes / Unknown
//XML HTTP Request function (old)
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  //Asynchronous
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const firstLang = getFirstObj(data.languages);
    const firstCurr = getFirstObj(data.currencies);

    const html = `
    <article class="country">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M people</p>
              <p class="country__row"><span>🗣️</span>${firstLang}</p>
              <p class="country__row"><span>💰</span>${firstCurr.name}</p>
            </div>
          </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

//Format of restcountries changed, needed to improvise to get first object.
const getFirstObj = function (obj) {
  for (let val of Object.values(obj)) {
    // console.log(val);
    return val;
  }
};

getCountryData('philippines');
getCountryData('usa');
