'use strict';

// PART 1

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
let currentImg;

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

// 1. Write an async function (recreate Challenge #2)
// 2. You can easily create another function to compress the repetitive codes inside async function
const loadNPause = async function () {
  try {
    const createImg1 = await createImage('img/img-1.jpg');
    currentImg = createImg1;
    console.log('Image 1 loaded');
    await wait(2);
    currentImg.style.display = 'none';

    const createImg2 = await createImage('img/img-2.jpg');
    currentImg = createImg2;
    console.log('Image 2 loaded');
    await wait(2);
    currentImg.style.display = 'none';
    // 3. Error-handling
  } catch (err) {
    console.error(`${err} 💥`);
  }
};

// loadNPause();

// PART 2

//1. Create an async function loadAll

const loadAll = async function (imgArr) {
  //2. Use .map to loop over the array, to load all the images
  try {
    //4. Use a promise combinator
    const allSet = await Promise.allSettled(imgArr);
    allSet.map(async imgs => {
      try {
        currentImg = await createImage(imgs.value);
        //3. Check out the 'imgs' array in the console, is it like you expected?
        console.log(imgs);
        //5. Add the parallel class to all the images
        currentImg.classList.add('parallel');

        return imgs;
      } catch (err) {
        console.error(`${err} 🖼️`);
      }
    });
  } catch (err) {
    console.error(`${err} 💥`);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-4.jpg']);

//3. Yes, because I was only expecting the imgPath to return, but after using Promise combinator, the console.log changed into a promise.

//Jonas Scmhedtmann Implementation

/*
//PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();
//PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-4.jpg']);
*/
