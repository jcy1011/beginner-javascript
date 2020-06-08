// console.log(
//   `ex-voto: a painting or other object left as an offering infulfillment
//    of a vow or in gratitude, as for recovery from an illness or injury.`
// );

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  // Remove the popup entirely
  popup.remove();
  // NOTE the popup below will still get logged, we have access to it even though
  // it's removed from the DOM but NOT from JavaScript's memory. This is a
  // potential memorey leak
  // console.log(popup);
  // Completely destroy all evidence of popup. Clean up memory
  /* eslint-disable no-param-reassign */
  popup = null;
  /* eslint-enable no-param-reassign */
}

// The options parameter is meant to a placeholder for an object argument
// It's better to pass an object when you have many options which contains
// severel optional options
function ask(options) {
  return new Promise(async function(resolve) {
    // First, create a popup with all fields in it
    // We use createElement instead of backticks so we can immediately addEventListner
    const popup = document.createElement('form');
    popup.classList.add('popup');
    // We can use backticks below because we don't need to listen to any
    // events in here. <fieldset> like div but groups form inputs, semantic.
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
        <label>${options.title}</label>
        <input type="text" name="input"/>
        <button type="submit">Submit</button>
      </fieldset>
    `
    );
    // console.log(popup);

    // Second, check if user wants a cancel button
    if (options.cancel) {
      const skipButton = document.createElement('button');
      // must give it a type of button otherwise it'll assume its a submit
      // and it'll submit the form for us
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      console.log(popup.firstChild);
      // use firstElementChild instead of firstChild to avoid bugs like
      // the firstChild selecting a newline as a node. Don't want that
      popup.firstElementChild.appendChild(skipButton);
      // listen for a click on the cancel button
      skipButton.addEventListener(
        'click',
        function() {
          resolve(null); // null bc that's what prompt returns if you enter nothing
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    // Listen for the submit event on inputs
    popup.addEventListener(
      'submit',
      function(e) {
        e.preventDefault();
        // console.log(e.target);
        // NOTE: anytime <input> has a name attribute, it will be available as
        // a property on the form
        resolve(e.target.input.value);
        // remove popup from the DOM
        destroyPopup(popup);
      },
      // Remove the eventListener after running it once
      { once: true }
    );

    // When user submits, resolve data from input

    // Insert popup into the DOM
    document.body.appendChild(popup);

    // popup doesn't fade in bc class changes queud up simultaneously
    // So put a very small timeout before we add the open class
    // this uses the event loop to our advantage. Note how even a 0 ms timeout
    // works to delay it bc the callback in the setTimeout function gets pushed
    // to the end of the task queue via the web APIs and gets put on the stack
    // once the stack is cleared. We use 50 ms bc 0 won't work in all browsers
    // setTimeout(function() {
    //   popup.classList.add('open');
    // }, 50);

    // Instead of using setTimeout above we can use async await
    await wait(50);
    popup.classList.add('open');
  });
}

// ask({ title: 'does this work?' });
// ask({ title: 'does this work?', cancel: true });

async function askQuestion(e) {
  // console.log(e);
  const button = e.currentTarget;
  console.log(button.dataset);
  const cancel = 'cancel' in button.dataset;

  const answer = await ask({ title: button.dataset.question, cancel });
  console.log(answer);
}

// Select all buttons that have a question
const buttons = document.querySelectorAll('[data-question]');
// console.log(buttons);
buttons.forEach(button => button.addEventListener('click', askQuestion));

// ask things in series using popups
const questions = [
  { title: 'What is your name?' },
  { title: 'What is your age?', cancel: true },
  { title: "What is your dog's name?" },
];

// Promise.all fires them all off at same time but in this case it results in
// all the popups appearing at once on top of each other. You can't use
// Promise.all if you want to fire them off sequentially
// Promise.all([ask(questions[0]), ask(questions[1]), ask(questions[2])]).then(
//   answers => {
//     console.log(answers);
//   }
// );

// loop over the array and for each one return a promise (yields an arr of
// promises)
// loop over each of the questions, pipe it into ask function (which
// returns a promise), etc. UI still all pops up all at once. so no go
// Promise.all(questions.map(ask)).then(data => {
//   console.log(data);
// });

// How do we make an async forEach or map function? for...of loop
// unlike map and forEach, for...of allows you to pause a loop using await
// inside the loop
// async function askMany() {
//   for (const question of questions) {
//     const answer = await ask(question);
//     console.log(answer);
//   }
// }
// askMany();

// turn above into a generic utility function
async function asyncMap(array, callback) {
  // make an array to store results
  const results = [];
  // loop over array
  for (const item of array) {
    results.push(await callback(item));
  }
  // when finished with loop return results
  return results;
}

// only creating this function so we can await. Can't await outside of a function
async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
