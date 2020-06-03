// console.log(
//   `ex-voto: a painting or other object left as an offering infulfillment
//    of a vow or in gratitude, as for recovery from an illness or injury.`
// );

// The options parameter is meant to a placeholder for an object argument
// It's better to pass an object when you have many options which contains
// severel optional options
function ask(options) {
  return new Promise(function(resolve) {
    // First, create a popup with all fields in it
    // We use createElement instead of backticks so we can immediately addEventListner
    const popup = document.createElement('form');
    popup.classList.add('popup');
    // We can use backticks below because we don't need to listen to any
    // events in here. <fieldset> like div but groups form inputs, semantic.
    popup.insertAdjacentHTML(
      'afterbegin',
      `
      <fieldset>
        <label>${options.title}</label>
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
      // TODO: listen for a click on the cancel button
    }

    // Third, listen for the submit event on inputs
    // When user submits, resolve data from input

    // Insert popup into the DOM
    document.body.appendChild(popup);
    // popup doesn't fade in bc class changes queud up simultaneously
    // So put a very small timeout before we add the open class
    // this uses the event loop to our advantage
    popup.classList.add('open');
  });
}

// ask({ title: 'wikwisekjf' });
