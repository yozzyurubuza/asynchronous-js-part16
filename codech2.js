'use strict';

//Part 1
//1. Create a function which receives imgPath

const img = document.createElement('img');
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    if (!imgPath) reject(new Error('Invalid image path 💥'));
    resolve(imgPath);
  });
};

const fetchAndAppend = function (url, errorMsg = 'Image file not found') {
  img.src = url;
  return fetch(img.src)
    .then(res => {
      console.log(res);
      if (res.status === 404) throw new Error(errorMsg);
      imgContainer.append(img);
    })
    .catch(err => console.error(err));
};

createImage('img/img-1.jpg')
  .then(res => {
    fetchAndAppend(res);
    return wait(2);
  })
  .then(() => {
    img.remove();
    return createImage('img/img-2.jpg');
  })
  .then(res => {
    fetchAndAppend(res);
    return wait(2);
  })
  .then(() => {
    imgContainer.style.display = 'none';
  })
  .catch(err => console.error(err));

//Jonas Schmedtmann Implementation

/*

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(()=>{
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

*/
