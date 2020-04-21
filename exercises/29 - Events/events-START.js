const butts = document.querySelector('.butts');

function handleBuyButton(event) {
  console.log('You are buying');
  console.log(event.target);
}

butts.addEventListener('click', handleBuyButton);
