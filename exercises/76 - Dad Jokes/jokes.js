const jokeButton = document.querySelector('.getJoke');
const jokeHolder = document.querySelector('.joke p');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke() {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
}

async function handleClick() {
  // destructure data we want into joke variable. We keep other data in case we need
  const { joke } = await fetchJoke();
  console.log(joke);
}

jokeButton.addEventListener('click', handleClick);
