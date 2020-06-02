console.log(
  'ex-voto: a painting or other object left as an offering in fulfillment of a vow or in gratitude, as for recovery from an illness or injury.'
);

function ask(options) {
  return new Promise(function(resolve) {
    // First, create a popup with all fields in it
    // We use createElement instead of backticks so we can immediately addEventListner

    const popup = document.createElement('form');
    // Second, check if user wants a cancel button
    // Third, listen for the submit event on inputs
    // Finally, when user submits, resolve data from input
  });
}
