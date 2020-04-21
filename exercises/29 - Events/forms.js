const wes = document.querySelector('.wes');

wes.addEventListener('click', function(event) {
  const shouldChangePage = confirm(
    'This website might be malicious!, do you wich to continue?'
  );
  if (shouldChangePage) {
    window.location = event.currentTarget.href;
  }
  // Alternatively, you can do following if
  // if (!shouldChangePage) {
  //   event.preventDefault();
  // }
});

const signupForm = document.querySelector('[name="signup"]');

signupForm.addEventListener('submit', function(event) {
  // easily grabbing elements inside of a form
  // don't need to use querySelector if using valid names in HTML
  //   console.log(event.currentTarget.name.value);
  //   console.log(event.currentTarget.email.value);
  //   console.log(event.currentTarget.agree.checked);
  const name = event.currentTarget.name.value;
  if (name.includes('chad')) {
    alert('Sorry bro');
    event.preventDefault();
  }
});

// console.log(signupForm.name);

function logEvent(event) {
  console.log(event.type);
  console.log(event.currentTarget.value);
}
signupForm.name.addEventListener('keyup', logEvent);
signupForm.name.addEventListener('keydown', logEvent);
signupForm.name.addEventListener('focus', logEvent);
signupForm.name.addEventListener('blur', logEvent);

const photo = document.querySelector('.photo');

photo.addEventListener('click', function() {
  console.log('You clicked the photo');
});
