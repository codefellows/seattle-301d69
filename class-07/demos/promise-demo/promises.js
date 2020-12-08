'use strict';

// When javascript runs it mainly runs synchronously, it finishes one thing before starting the next
// parts of javascript are set up to run in the background because they are things that take a long time - we call these asynchronous which means out of order
// to manage this, JavaScript wrapped every single long thing into `Promise`
// A Promise is something that is promissing to give the app data later

// Promises declare functionality, they are like click listeners or route handlers
// WHEN the promise comes back THEN do some code

let longtask = (status) => new Promise( (resolve, reject) => {
  let timer = Math.floor(Math.random() * 3000);
  setTimeout( () => {
    if(status) resolve(`${status} : everything went great`);
    else reject('oh no it broke');
  }, timer);
});

longtask()
  .then(whateverComesBack => console.log(whateverComesBack))
  .catch(whateverComesBack => console.log('the thing that went wrong' + whateverComesBack));




longtask().catch(whateverComesBack => console.log('the thing that went wrong' + whateverComesBack));
longtask().catch(whateverComesBack => console.log('the thing that went wrong' + whateverComesBack));
longtask(true).then(whateverComesBack => console.log(whateverComesBack));
longtask('that went great').then(whateverComesBack => console.log(whateverComesBack));
longtask('ok').then(whateverComesBack => console.log(whateverComesBack));


// longtask('first').then(result => {
//   console.log(result);
//   longtask('second').then(result => {
//     console.log(result);
//     longtask('third').then(result => {
//       console.log(result);
//       longtask('fourth').then(result => {
//         console.log(result);
//         longtask('fifth').then(result => {
//           console.log(result);
//         });
//       });
//     });
//   });
// });


longtask('first')
  .then(result => {
    console.log(result);
    return longtask('second');
  })
  .then(result => {
    console.log(result);
    return longtask('third');
  })
  .then(result => {
    console.log(result);
    return longtask('fourth');
  })
  .then(result => {
    console.log(result);
    return longtask('fifth');
  })
  .then(result => {
    console.log(result);
  });



// Not necessary at all for lab
const promiseArray = [];
for(let i = 0; i < 10000; i++){
  promiseArray.push(longtask('task: ' + i));
}

Promise.all(promiseArray).then(() => console.log(promiseArray));
