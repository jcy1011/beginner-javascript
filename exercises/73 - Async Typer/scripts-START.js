// console.log(
//   'vilipend: to hold or treat as of little worth or account : contemn',
//   ': to express a low opinion of : disparage'
// );

// TWO WAYS (1) async for of loop (2) recursion

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// We add the third parameter, randomNumber to make this a pure function
// i.e we can pass in our own random number for testing purposes and always
// get the same result
function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// (1) async for of loop
// Erase all text from element. Then letter by letter write it back in
async function draw(el) {
  const text = el.textContent;
  let soFar = '';
  for (const letter of text) {
    // console.log(letter);
    soFar += letter;
    el.textContent = soFar;
    // wait for some amount of time
    console.log(el.dataset);
    const { typeMin, typeMax } = el.dataset;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await wait(amountOfTimeToWait);
  }
}

// (2) recursion
// function draw(el) {
//   let index = 1;
//   const text = el.textContent;
//   const { typeMin, typeMax } = el.dataset;
//   // taking advantage of closure...
//   async function drawLetter() {
//     el.textContent = text.slice(0, index);
//     index += 1;
//     // wait for some time
//     // Note, we calculate the random amount of time inside drawLetter
//     // so the amount of wait time between each letter is different
//     const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
//     await wait(amountOfTimeToWait);
//     // exit condition
//     if (index <= text.length) {
//       drawLetter();
//     }
//   }
//   // when this function draw() runs, kick off drawLetter
//   drawLetter();
// }

// const els = document.querySelectorAll('[data-type]');
// // els.forEach(el => draw(el));
// // Same as above
// els.forEach(draw);

// replace all of above 5 or so lines
document.querySelectorAll('[data-type]').forEach(draw);
