'use strict';

//Promises and the Fetch API

//Old code - XML
// const request = new XMLHttpRequest();
//   //Asynchronous
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//Simple GET request using fetch
const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);

// What are Promises?
/*

Promise
- An object that is used as a placeholder for the future result of an asynchronous operation.

- A container for an asynchronous delivered value.

- A container for a future value.
    Ex. Response from AJAX call

- We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.

- Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell

Ex. Lottery Ticket - Promise that I will receive money if I guess correct outcome

    - I buy lottery ticket (promise) right now
    - Lottery draw happens asynchronously
    - If correct outcome, I receive money, because it was promised


//The Promise Lifecycle

Pending - Before the future is available

Settled - Asynchronous task has finished
    * Fulfilled - Success! The value is now available
    * Rejected - An error happened (Ex. Offline)

* We are able to handle these different states in our code

* A promise is only settled once - will remain unchanged forever


Build Promise - Fetch API returns promise

Consume Promise - When we already have a promise (Ex. promise returned from Fetch API)



*/
